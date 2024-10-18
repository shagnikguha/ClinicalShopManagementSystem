import mongoose from "mongoose";

const connectToMongoDB = async()=>{
     try{
        await mongoose.connect(`mongodb://localhost:27017/MedicineShop`);
        console.log('MongoDB connected successfully!');
     }

     catch(err){
        console.error('DB connection error:',err.message);
     }
}

export default connectToMongoDB;