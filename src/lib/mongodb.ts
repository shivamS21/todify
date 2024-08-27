import mongoose from "mongoose";
const { CONNECTION_STRING } = process.env;
export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(CONNECTION_STRING as string);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};