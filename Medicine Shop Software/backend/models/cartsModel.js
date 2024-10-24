import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    medicineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity cannot be less than 1'],
    }
},{timestamps: true});

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [cartItemSchema],
    
    paid:{
     type: Boolean,
     required: true, 
    },
},{timestamps:true});


const Cart = mongoose.model('Cart', cartSchema);
export default Cart;