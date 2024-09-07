import { register } from "../register/register";
import { generateRandomPassword } from "./passwordGenerator";

export async function checkUser(session: any) {
    const { name, email, image } = session.user;


    const r = await register({
        email, 
        password: generateRandomPassword(), 
        name, 
        image, 
      });
  
    if (r?.error){
        return {error: r.error};
    }
    return {success: 'User logged in successfully'};
}