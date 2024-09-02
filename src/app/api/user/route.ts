import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST (request: Request) {
    const {name, email} = await request.json();
    console.log(name, email);

    await connectDB();

    await User.create({})

    return new Response(JSON.stringify({name, email}), {
        headers: {
            "Content-Type": "application/json"
        },
        status: 201
    });
}

export async function GET () {
    return new Response("I am Shivam");
}