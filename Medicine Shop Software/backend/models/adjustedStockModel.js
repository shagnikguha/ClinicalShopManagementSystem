import mongoose from "mongoose";

const stocksSchema = new mongoose.Schema({
    medicine: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine', required: true 
    },
    
    adjustment_date: {
         type: Date,
         default: Date.now
         },

    quantity_adjusted: {
         type: Number,
         required: true
         },

  });