import { Router } from "express";
import passport from "passport";
import Cart from "../models/cartsModel.js";
import Medicine from "../models/medicineModel.js";
import prevCart from "../models/prevcartModel.js";
import mongoose from "mongoose";

const cartrouter = Router();
let previousCart={}
// Middleware for checking authentication
const Authenticated = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return res.status(200).json({});
    }
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};

// GET /cart: Display user's cart
cartrouter.get('/cart', Authenticated, async (req, res) => {
    try {
        let amount = 0;
        let currentCart = await Cart.findOne({ userId: req.user._id, paid: false }).populate('items.medicineId');
        let previousCart = await prevCart.findOne({ userId: req.user._id, paid: true }).sort({ updatedAt: -1 }).populate('items.medicineId');

        // Check if there's a paid cart but no current cart
        let paidCart = await Cart.findOne({ userId: req.user._id, paid: true });
        if (paidCart && !currentCart) {
            // Move paid cart to prevCart
            const paidCartObject = paidCart.toObject();
            delete paidCartObject._id; // Remove the _id field

            previousCart = await prevCart.findOneAndUpdate(
                { userId: req.user._id, paid: true },
                { $set: paidCartObject },
                { upsert: true, new: true }
            ).populate('items.medicineId');

            await Cart.deleteOne({ _id: paidCart._id });

            // Create a new empty unpaid cart
            currentCart = new Cart({
                userId: req.user._id,
                items: [],
                paid: false,
            });
            await currentCart.save();
        }

        if (currentCart && currentCart.items) {
            amount = currentCart.items.reduce((total, item) => total + (item.medicineId.price * item.quantity), 0);
        }

        res.render('cart', { present: currentCart, past: previousCart, price: amount });
    } catch (err) {
        console.error('Error fetching cart:', err);
        return res.status(500).render('cart', { present: null, past: null, price: 0, error: 'Error retrieving cart' });
    }
});


// POST /cart/add: Add an item to the cart
cartrouter.post('/cart/add', Authenticated, async (req, res) => {
    const { medicineId, quantity } = req.body;
    
    if (!medicineId || !quantity) {
        return res.status(400).render('search', { error: 'Medicine ID and quantity are required.' });
    }
    
    try {
        const medicine = await Medicine.findById(medicineId);
        if (!medicine) {
            return res.status(404).render('search', { error: 'Medicine not found!' });
        }

        // Check if there's a paid cart
        let paidCart = await Cart.findOne({ userId: req.user._id, paid: true });
        
        if (paidCart) {
            // Move paid cart to prevCart
            const paidCartObject = paidCart.toObject();
            delete paidCartObject._id; // Remove the _id field

            await prevCart.findOneAndUpdate(
                { userId: req.user._id, paid: true },
                { $set: paidCartObject },
                { upsert: true, new: true }
            );
            await Cart.deleteOne({ _id: paidCart._id });
        }

        // Find or create unpaid cart
        let cart = await Cart.findOne({ userId: req.user._id, paid: false });
        if (!cart) {
            cart = new Cart({
                userId: req.user._id,
                items: [],
                paid: false,
            });
        }

        // Update cart items
        const existingItem = cart.items.find(item => item.medicineId.toString() === medicineId);
        if (existingItem) {
            const newQuantity = existingItem.quantity + parseInt(quantity);
            existingItem.quantity = Math.min(newQuantity, medicine.stockQuantity);
        } else {
            cart.items.push({
                medicineId: medicineId,
                quantity: Math.min(parseInt(quantity), medicine.stockQuantity)
            });
        }

        await cart.save();
        res.redirect('/search');
    } catch (err) {
        console.error('Error adding to cart:', err);
        res.status(500).render('search', { error: 'An error occurred while adding to cart.' });
    }
});


// POST /cart/remove: Remove an item from the cart
cartrouter.post('/cart/remove', Authenticated, async (req, res) => {
    const { medicineId } = req.body;

    if (!medicineId) {
        return res.status(400).render('cart', { error: 'Medicine ID is required.' });
    }

  /*  const session = await mongoose.startSession();
    session.startTransaction(); // Start the transaction  */

    try {
        let cart = await Cart.findOne({ userId: req.user._id , paid: false});
        if (!cart) {
            return res.status(400).render('cart', { err: 'Cart not found!' });
        }

        const itemIndex = cart.items.findIndex(item => item.medicineId.toString() === medicineId);
        if (itemIndex === -1) {
            return res.status(400).render('cart', {present: null, past: previousCart, err: 'Item not found in cart!' });
        }

        const itemToBeRemoved = cart.items[itemIndex];
        cart.items.splice(itemIndex, 1); // Remove the item from the cart


        // Save the updated cart
        await cart.save();

       /* await session.commitTransaction(); */
        res.redirect('/cart');
    } catch (err) {
       // await session.abortTransaction();
        console.error('Error removing from cart:', err.message);
        res.status(500).render('cart', {present: null, past: [], error: err.message });
    } 
});

// POST /cart/add-from-ocr: Add items extracted from OCR to the cart
cartrouter.post('/cart/add-from-ocr', Authenticated, async (req, res) => {
    const medicines = req.body.medicines;
    console.log(medicines);

    if (!medicines || medicines.length === 0) {
        return res.status(400).json({ error: 'Medicines are required.' });
    }

    try {
        // Check if there's a paid cart
        let paidCart = await Cart.findOne({ userId: req.user._id, paid: true });
        
        if (paidCart) {
            // Move paid cart to prevCart
            const paidCartObject = paidCart.toObject();
            delete paidCartObject._id; // Remove the _id field

            await prevCart.findOneAndUpdate(
                { userId: req.user._id, paid: true },
                { $set: paidCartObject },
                { upsert: true, new: true }
            );
            await Cart.deleteOne({ _id: paidCart._id });
        }

        // Find or create unpaid cart
        let cart = await Cart.findOne({ userId: req.user._id, paid: false });
        if (!cart) {
            cart = new Cart({
                userId: req.user._id,
                items: [],
                paid: false,
            });
        }

        // Add each medicine to the cart
        let addedMedicines = []; // Store successfully added medicines

        for (let medicineName of medicines) {
            const medicine = await Medicine.findOne({ name: medicineName });
            if (medicine) {
                const existingItem = cart.items.find(item => item.medicineId.toString() === medicine._id.toString());
                if (existingItem) {
                    const newQuantity = existingItem.quantity + 1;
                    existingItem.quantity = Math.min(newQuantity, medicine.stockQuantity);
                } else {
                    cart.items.push({
                        medicineId: medicine._id,
                        quantity: 1
                    });
                }
                addedMedicines.push(medicineName);  // Add to the list of successfully added medicines
            }
        }

        // Save the updated cart
        await cart.save();

        console.log("Medicines added to the cart:", addedMedicines);
        res.json({ message: 'Medicines added to the cart', addedMedicines, cart });
    } catch (err) {
        console.error('Error adding medicines from OCR:', err.message);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
});

export {cartrouter,Authenticated};
