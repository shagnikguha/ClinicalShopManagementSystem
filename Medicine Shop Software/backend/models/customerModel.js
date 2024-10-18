import mongoose from "mongoose";

const customerSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: [true,'Please Enter the email field'],
        unique: true,
    },

    password:{
        type: String,
        required: function(){
            return !this.googleId;
        },
        minlength: [6,'Please enter atleast 6 characters'],
    },


    googleId: { 
            type: String, 
            unique: true, 
            sparse: true 
        },

    phone:{
       type: String, 
    }

},{timestamps:true})

const User= mongoose.model('User',customerSchema);
export default User;