import { NextResponse } from 'next/server';
import Task from '@/models/Task';
import { connectDB } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    // Connect to the database
    await connectDB();

    // Fetch the session
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Parse the request body
    const { heading, description, dueDate, comment, priority } = await request.json();

    // Use the user's ID from the session
    const userId = session.user.id;

    // Create a new task
    const newTask = new Task({
      userId,
      heading,
      description,
      dueDate: new Date(dueDate),
      comment,
      priority,
    });

    // Save the task in the database
    const savedTask = await newTask.save();

    return NextResponse.json({ message: 'Task created successfully', task: savedTask }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
