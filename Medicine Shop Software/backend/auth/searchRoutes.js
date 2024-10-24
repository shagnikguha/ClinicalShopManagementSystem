import { Router } from "express";
import Cart from "../models/cartsModel.js";
import User from "../models/customerModel.js";
import Medicine from "../models/medicineModel.js";
import { Authenticated } from "./cartRoutes.js";

const searchRouter = Router();
let medicines = {};

searchRouter.get('/search', Authenticated, async (req, res) => {
   try {
      const medicines = await Medicine.find({});
      let item_no = 0;
      let amount = 0;

      const cart = await Cart.findOne({ userId: req.user._id, paid: false }).populate('items.medicineId');
      
      if (cart && cart.items && cart.items.length > 0) {
        item_no = cart.items.length;
        amount = cart.items.reduce((total, item) => total + (item.medicineId.price * item.quantity), 0);
      }

      if (medicines) {
         res.render('search', { medicines: medicines, items: item_no, price: amount });
         console.log('Search rendered successfully!');
      } else {
         res.render('search', { medicines: null, items: 0, price: 0, err: 'Error while loading medicines!' });
         console.log('Some error occurred!');
      }
   } catch (err) {
      console.error(err);
      return res.render('search', { medicines: null, items: 0, price: 0, err: 'Error while loading medicines!' });
   }
});

searchRouter.get('/search/:category', Authenticated, async (req, res) => {
   try {
      const category = req.params.category.toString();
      const medicines = await Medicine.find({ category: category });

      const cart = await Cart.findOne({ userId: req.user._id, paid: false }).populate('items.medicineId');
      const item_no = cart.items.length;

      let amount = cart.items.reduce((total, item) => total + (item.medicineId.price * item.quantity), 0);

      if (medicines) {
         res.render('search', { medicines: medicines, items: item_no, price: amount });
      }

      else {
         res.render('search', { medicines: null, err: 'Error while loading medicines!' })
         console.log('Some error occured!');
      }
   }

   catch (err) {
      console.log('error:', err.message);
      return res.render('search', { medicines: null, err: 'Error while loading medicines!' });
   }
});



export default searchRouter;
