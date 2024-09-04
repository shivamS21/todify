import { NextResponse } from 'next/server';
import Task from '@/models/Task';
import { connectDB } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { authOptions } from "@/lib/auth";


export async function POST(request: Request) {
  try {
    // await connectDB();

    const session = await getServerSession(authOptions);

    console.log(session);
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // const { heading, description, dueDate, comment, priority } = await request.json();
    // console.log('shivam', { heading, description, dueDate, comment, priority });
    // const userId = session.user.id;

    // const newTask = new Task({
    //   userId,
    //   heading,
    //   description,
    //   dueDate: new Date(dueDate),
    //   comment,
    //   priority,
    // });

    // const savedTask = await newTask.save();

    return NextResponse.json({ message: 'Task created successfully', task: 'savedTask' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
