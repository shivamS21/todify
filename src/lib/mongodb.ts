"use server"
import mongoose from "mongoose";
const { CONNECTION_STRING } = process.env;

let isConnected = false
export const connectDB = async () => {
  if (isConnected) {
    return Promise.resolve(true)
  }
  try {
    const { connection } = await mongoose.connect(CONNECTION_STRING as string);
    if (connection.readyState === 1) {
      isConnected = true
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};