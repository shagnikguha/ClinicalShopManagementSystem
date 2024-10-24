import { Router } from "express";
import axios from "axios";
import { Authenticated } from "./cartRoutes.js";
import { v4 as uuidv4 } from 'uuid';
import Transaction from "../models/paymentModel.js";
import Cart from "../models/cartsModel.js";
import Medicine from "../models/medicineModel.js";
import crypto from 'crypto';
import prevCart from "../models/prevcartModel.js";
import transporter from "../controllers/emailController.js";
import nodemailer from 'nodemailer';

const PaymentRouter = Router();
let userid;
let user_email;
const Merchant_Id = "PGTESTPAYUAT86";
const salt_index = 1;
const base_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/";
const salt_key = "96434309-7796-489d-8924-ab56988a6076"  //all these are for test and can be obtained in phonepe's API documentation
let amount;
let merchantUserId;

function generateTransactionId() {
    return uuidv4();
}

function calculateChecksum(payload, saltKey) {
    const string = Buffer.from(JSON.stringify(payload)).toString('base64') + '/pg/v1/pay' + saltKey;
    return crypto.createHash('sha256').update(string).digest('hex') + '###' + salt_index;
}

PaymentRouter.get('/payment', Authenticated, async (req, res) => {
    let cart;
    let previousCart = null;
    userid = req.user._id;
    user_email= req.user.email;
    try {
        cart = await Cart.findOne({ userId: req.user._id, paid: false }).populate('items.medicineId');

        previousCart = await prevCart.find({ userId: req.user._id, paid: true }).populate('items.medicineId').sort({ createdAt: -1 });
        user_email = req.user.email;//setting up the user email

        if (previousCart) {  //does previous cart exist
            previousCart = previousCart[0];
        }

        if (!cart || cart.items.length === 0) {
            console.log('in if')
            return res.status(400).render('cart', { present: null, past: previousCart, error: 'Cart is empty' });
        }
    }
    catch (err) {
        console.log('in catch')
        return res.status(400).render('cart', { present: cart, past: previousCart, error: 'Some error occured' });
    }
    let amount = 0;
    amount = cart.items.reduce((total, item) => total + (item.medicineId.price * item.quantity), 0) * 100;  //amount is in paise


    //refer payload and options structure in https://developer.phonepe.com/v1/reference/pay-api-1 page
    let transaction_id = generateTransactionId();
    try {
        merchantUserId = req.user._id.toString();
        const payload = {
            merchantId: Merchant_Id,
            merchantTransactionId: transaction_id,
            amount: amount,
            redirectUrl: `${req.protocol}://${req.get('host')}/payment-status/${transaction_id}`,
            redirectMode: 'POST',
            callbackUrl: `${req.protocol}://${req.get('host')}/payment-callback`,
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };

        console.log('Payload:', JSON.stringify(payload, null, 2));

        if (req.user.phone) {
            payload.mobileNumber = req.user.phone;
        }
        console.log('before checksum');
        const checksum = calculateChecksum(payload, salt_key);
        console.log('Checksum:', checksum);

        const options = {
            method: 'POST',
            url: `${base_URL}pg/v1/pay`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: Buffer.from(JSON.stringify(payload)).toString('base64')
            }
        };
        const response = await axios.request(options);


        if (response.data.success) {
            return res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
        }

        else {
            res.status(500).render('cart', { present: cart, past: previousCart, err: response.data.message || 'Error processing payment' });
        }
    }

    catch (err) {
        console.log('in 2nd catch');
        console.error('Axios request error:', err.response ? err.response.data : err.message);
        res.status(500).render('cart', { present: cart, past: previousCart, err: 'Internal server error' });
    }
});

PaymentRouter.post('/payment-status/:transactionId', async (req, res) => {
    // Handle the redirect from PhonePe
    console.log('Redirect received:', req.params.transactionId);
    // Process the payment status
    const cart = await Cart.findOne({ userId: userid, paid: false }).populate('items.medicineId');
    let amount = 0;
    amount = cart.items.reduce((total, item) => total + (item.medicineId.price * item.quantity), 0) //amount calc
    const transaction = new Transaction({
        uid: userid,
        method: 'UPI',
        transaction_id: req.params.transactionId,
        amount: amount,
    });


    for (let item of cart.items) {
        const medicine = await Medicine.findById(item.medicineId._id);
        if (medicine) {
            if (medicine.stockQuantity >= item.quantity) {
                medicine.stockQuantity -= item.quantity;  //reducing the medicine  quantity
            } else {
                medicine.stockQuantity = 0;
            }
            await medicine.save();
        }
    }

    cart.paid = true;
    await cart.save();
    await transaction.save();


    //code for sending email to the user after successful transaction

    const mailContents = `<h1> Payment Successfull </h1>
                         <p>Thank you for choosing us <p>
                         <h2>Cart Contents:</h2>
                         <ul>
                         ${cart.items.map(item => `<li>${item.medicineId.name} - Quantity: ${item.quantity}</li>`)}
                          </ul>
                         <p>Total Amount: ₹${(amount / 100).toFixed(2)}</p>`;

    //building the metadata for email
    const mailOptions = {
        from: 'MediEase',
        to: user_email, // recipient's email -->Current logged in user
        subject: 'Your Order Confirmation',
        html: mailContents,
    };
    //send email
    try {
       const info= await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }

    res.render('home', { status: 'Success' });
});

PaymentRouter.post('/payment-callback', async (req, res) => {
    try {
        console.log(req.body);
        const { response } = req.body;
        const verifyHeader = req.headers['x-verify'];

        if (!verifyHeader || !response) {
            return res.status(200).render('home', { err: 'Payment error' });
        }

        const calculatedHash = crypto
            .createHash('sha256')
            .update(response + '/pg/v1/status/' + salt_key)
            .digest('hex') + '###' + salt_index;

        if (calculatedHash !== verifyHeader) {
            return res.status(500).render('home', { err: 'Payment error' });
        }

        if (response.success) {
            /* console.log('inside the great ifff')
              const cart = await Cart.find({ userId: userid, paid: false }).populate('items.medicineId');
  
              const transaction = new Transaction({
                  uid: userid,
                  method: 'UPI',
                  transaction_id: response.data.merchantTransactionId,
                  amount: amount,
              });
  
  
              for (let item of cart.items) {
                  const medicine = await Medicine.findById(item.medicineId._id);
                  if (medicine) {
                      if (medicine.stockQuantity >= item.quantity) {
                          medicine.stockQuantity -= item.quantity;
                      } else {
                          medicine.stockQuantity = 0;
                      }
                      await medicine.save();
                  }
              }
  
              cart.paid = true;
              await cart.save();
              await transaction.save();
              return res.status(200).render('search', { message: 'Payment successful!' });
          }
  
          else{
              console.log('inside the else :{{{{')
              return res.status(200).render('search', { message: 'Payment unsucessfull!' });  
          } */
        }
    }
    catch (err) {
        res.status(500).render('search', { err: 'Internal server error!' })
    }

});

export default PaymentRouter;

