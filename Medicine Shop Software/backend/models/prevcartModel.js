import mongoose from "mongoose";

const prevcartItemSchema = new mongoose.Schema({
    medicineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity cannot be less than 1']
    }
},{timestamps: true});

const prevcartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [prevcartItemSchema],
    
    paid:{
     type: Boolean,
     required: true, 
    },
},{timestamps:true});


const prevCart = mongoose.model('prevCart', prevcartSchema);
export default prevCart;