import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongo db connected Succesfully `);
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit(1); // code 1 means exit with failure
  }
};
