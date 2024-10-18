import mongoose from "mongoose";

const salesSchema= new mongoose.Schema({
    saledate:{
      type: Date,
    },

    medicine_id:{
     type: mongoose.Schema.Types.ObjectId,
     ref: "Medicine",
    }
})