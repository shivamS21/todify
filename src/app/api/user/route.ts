import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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

export async function GET() {
    try {
        // Fetch the session on the server side
        const session = await getServerSession(authOptions);
        
        if (!session || !session.accessToken) {
            return new Response('Unauthorized', { status: 401 });
        }

        // Return the access token if the session is valid
        return new Response(session.accessToken, { status: 200 });

    } catch (error) {
        console.error('Error fetching session:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}