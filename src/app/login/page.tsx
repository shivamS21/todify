"use client";
import { FormEvent, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { checkUser } from "../utility/checkGoogleSignInNewUser";
import Loading from "../components/Loading";
import { connectDB } from "@/lib/mongodb";

export default function Login() {
    useEffect(() => {
        const initializeDBConnection = async () => {
            try {
                await connectDB(); 
            } catch (error) {
                console.error('Failed to connect to MongoDB:', error);
            }
        };

        initializeDBConnection(); 
    }, []);

    const [error, setError] = useState("");
    const { data: session, status } = useSession();
    const router = useRouter();
    const redirectPath = "/views/today";
    const [checkUserResolved, setCheckUserResolved] = useState<boolean>(false);

    useEffect(() => {
        if (status === "authenticated") {
            setCheckUserResolved(true);
            checkUser(session).then(loginResult => {
                setCheckUserResolved(false);
                if (loginResult?.success) {
                router.push(redirectPath);
                } else {
                    router.push('/login');
                }
            });
        }
    }, [session, status, router]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const res = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        if (res?.error) {
            setError(res.error as string); // need to return to the same /login address
            return;
        }

        if (res?.ok) {
            router.push(redirectPath);
        }
    };

    if (status === "loading" || checkUserResolved) {
        return <Loading/>
    }

    return (
        <section className="relative flex flex-col justify-center  p-6 w-full max-w-[800px] h-screen gap-2 left-1/10">
            <h1 className="mb-5 w-full text-2xl font-bold text-left">Log In</h1>
            <button
                onClick={() => signIn("google")}
                className="pl-4 pr-4 flex items-center gap-2 border-2 h-12 border-solid border-gray-400 cursor-pointer flex-row justify-center w-[400px]">
                <Image src="https://authjs.dev/img/providers/google.svg" alt="Google Logo" width={32} height={32} />
                <span className='text-lg font-bold'>Continue with Google</span>
            </button>
            <form
                className="flex flex-col justify-between items-center gap-2 rounded w-[400px]"
                onSubmit={handleSubmit}>
                {error && (
                  <div className="text-red-500 text-sm text-left mt-4 mb-4 w-full max-w-[400px]">
                    {error}
                  </div>
                )}
                <label className="w-full text-sm">Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full h-11 border border-solid border-black rounded p-2"
                    name="email" 
                    autoComplete="username"
                />
                <label className="w-full text-sm">Password</label>
                <div className="flex w-full">
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full h-11 border border-solid border-black rounded p-2"
                        name="password" 
                        autoComplete="current-password"
                    />
                </div>
                <button className="w-full border border-solid border-black rounded bg-orange-500 py-1.5 mt-2.5 h-10
                transition duration-150 ease hover:bg-orange-400">
                    Log In
                </button>
                <div className="flex w-[100%] text-sm text-[#888] justify-center border-t border-gray-300 mt-1 pt-3">
                    <span>Don&apos;t have an account?
                    <Link
                        href="/register"
                        className="text-[#888] transition duration-150 ease hover:text-black ml-1">
                        <u>Sign Up</u>
                    </Link>
                    </span>
                </div>
            </form>
        </section>
    );
}
