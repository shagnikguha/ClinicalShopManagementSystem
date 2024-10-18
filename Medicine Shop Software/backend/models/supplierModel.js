import mongoose from "mongoose";

const supplierSchema= new mongoose.Schema({
    supplier_name:{
        type:String,
        required:true,
    },

    contact_number:{
        type: String,
        required: true,
    },

    address:{
        type: String,
    },

})

const Supplier= mongoose.model('Supplier',supplierSchema);
export default Supplier;