import { NextResponse } from 'next/server';
import Task from '@/models/Task';
import { connectDB } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import jwt from 'jsonwebtoken';

// POST request handler
export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  console.log('token', token);

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log('User is authenticated', decoded);

    // Fetch the session using NextAuth
    const session = await getServerSession(authOptions);
    console.log('session', session);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Parse the request body
    const { heading, description, dueDate, comment, priority } = await req.json();

    // Use the user's ID from the session
    const userId = session.user.id;

    // Create a new task with the user information and details from the request body
    const newTask = new Task({
      userId,
      heading,
      description,
      dueDate: new Date(dueDate),
      comment,
      priority,
    });

    // Connect to the database
    await connectDB();
    // Save the task in the database
    const savedTask = await newTask.save();

    // Return a success response with the saved task
    return NextResponse.json({ message: 'Task created successfully', task: savedTask }, { status: 201 });

  } catch (error) {
    console.error('Error in POST request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
