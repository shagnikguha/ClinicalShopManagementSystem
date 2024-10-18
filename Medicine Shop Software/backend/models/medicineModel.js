import mongoose from "mongoose";

const medicneSchema= new mongoose.Schema({
    name:{
      type:String,
      requuired: true,  
    },

    category:{
       type: String, 
    },

    description:{
      type: String,
    },

    stockQuantity:{
      type: Number,
    },

    price:{
     type: Number,
     required: true,
    },

    manufactureDate:{
      type: String,
      required: true,
    },

    expiryDate:{
        type: String,
        required: true,
    }
})

const Medicine= mongoose.model('Medicine',medicneSchema);
export default Medicine;