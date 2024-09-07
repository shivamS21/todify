"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "./register";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import Loading from "../components/Loading";


export default function Register() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const { data: session, status } = useSession(); // Use useSession hook
  const redirectPath = "/views/today"; // Default to "/views/today"
  
  useEffect(() => {
    // If the user is already authenticated, redirect them to the intended page
    if (status === "authenticated") {
      router.push(redirectPath);
    }
}, [status, router]);

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    // keep a check on email, password and name
    // for now, I will provide a valid email, password and name: use Zord

    const r = await register({
      email, password, name, auth_provider: 'local', image: ''   
    });

    if(r?.error){
        setError(r.error);
    } else {
        router.push("/login");
    }

    ref.current?.reset();
  };  
    
    if (status === "loading") {
      return <Loading/>
    }
    return(
        <section className="relative flex flex-col justify-center  p-6 w-full max-w-[800px] h-screen gap-2 left-1/10">
              <h1 className="mb-5 w-full text-2xl font-bold text-left">Sign up</h1>
              <button
                  onClick={() => signIn("google")}
                  className="pl-4 pr-4 flex items-center gap-2 border-2 h-12 border-solid border-gray-400 cursor-pointer flex-row justify-center w-[400px]">
                  <Image src="https://authjs.dev/img/providers/google.svg" alt="Google Logo" width={32} height={32} />
                  <span className='text-lg font-bold'>Continue with Google</span>
              </button>
              <form ref = {ref}
                action={handleSubmit}
                className="flex flex-col justify-between items-center gap-2 border rounded w-[400px]">
        
                {error && (
                  <div className="text-red-500 text-sm text-left mt-4 mb-4 w-full max-w-[400px]">
                    {error}
                  </div>
                )}
                <label className="w-full text-sm">Name</label>
                <input
                  type="name"
                  placeholder="Full Name"
                  className="w-full h-11 border border-solid border-black p-2 rounded"
                  name="name"
                />

                <label className="w-full text-sm">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full h-11 border border-solid border-black p-2 rounded"
                  name="email"
                />
        
                <label className="w-full text-sm">Password</label>
                <div className="flex w-full">
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full h-11 border border-solid border-black p-2 rounded"
                    name="password"
                  />
                </div>
        
                <button className="w-full border border-solid border-black bg-orange-400 h-10 py-1.5 mt-2.5 rounded
                transition duration-150 ease hover:bg-orange-300">
                  Sign up with Email
                </button>
        
                
                <Link href="/login" className="text-sm text-[#888] transition duration-150 ease hover:text-black">
                  Already have an account?
                  </Link>
              </form>
        </section>
    )

}
