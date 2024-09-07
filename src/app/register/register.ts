"use server"
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const register = async (value: any) => {
    const { email, password, name, auth_provider, image } = value;
    try {
        await connectDB();
        const userFound = await User.findOne({ email });
        if(userFound){
            if (auth_provider === 'local')
            return { error: 'Email already exists!' }
            else
            return { success: true };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          name,
          email,
          password: hashedPassword,
          image
        });
        await user.save();
        return { success: true };
    }catch(e: any){
        return { error: e.message };
    }
}