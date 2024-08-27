"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectPath = searchParams.get("redirect") || "/views/today"; // Default to "/today"

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const res = await signIn("credentials", {
          email: formData.get("email"),
          password: formData.get("password"),
          redirect: false,
        });

        if (res?.error) {
          setError(res.error as string);
        }

        if (res?.ok) {
          return router.push(redirectPath);  // Redirect to the intended page
        }
    };

    return (
        <section className="w-full h-screen flex items-center justify-center">
          <form
            className="p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2 
            border border-solid border-black bg-white rounded"
            onSubmit={handleSubmit}>
            {error && <div className="text-black">{error}</div>}
            <h1 className="mb-5 w-full text-2xl font-bold">Sign In</h1>
            <label className="w-full text-sm">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full h-8 border border-solid border-black rounded p-2"
              name="email" />
            <label className="w-full text-sm">Password</label>
            <div className="flex w-full">
              <input
                type="password"
                placeholder="Password"
                className="w-full h-8 border border-solid border-black rounded p-2"
                name="password" />
            </div>
            <button className="w-full border border-solid border-black rounded">
              Sign In
            </button>
    
            <Link
              href="/register"
              className="text-sm text-[#888] transition duration-150 ease hover:text-black">
              Don't have an account?
            </Link>
          </form>
        </section>
    );
}
