import mongoose from "mongoose";

const paymentSchema= new mongoose.Schema({
   transaction_id:{
    type:String,
    required: true,
   },

   amount:{
    type:Number,
    required: true,
   },

    uid:{
     type: mongoose.Schema.Types.ObjectId,
     ref: "User",
    },
    
    method:{
      type: String,   
    }

},{timestamps:true})

const Transaction= mongoose.model('Transaction',paymentSchema);
export default Transaction;