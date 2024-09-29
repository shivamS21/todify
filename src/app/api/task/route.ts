import { NextResponse } from 'next/server';
import Task from '@/models/Task';
import { connectDB } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// POST request handler
export async function POST(req: Request) {
  try {

    const session = await getServerSession(authOptions);

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

    await connectDB();
    const savedTask = await newTask.save();

    return NextResponse.json({ message: 'Task created successfully', task: savedTask }, { status: 201 });

  } catch (e) {
    console.error('Error in POST request:', e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

// GET request handler
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userTasks = await Task.find({ userId: session?.user.id }); // Array of tasks
    return NextResponse.json({ userTasks }, { status: 200 });

  } catch (e) {
    console.error('Error in task GET request', e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

// DELETE request handler
export async function DELETE(req: Request) {
  try {
    const { taskId } = await req.json(); // Expect taskId in the body
    
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully!" }, { status: 200 });
  } catch (e) {
    console.error('Error in task DELETE request', e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function PUT(req: Request) {

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { taskId, dueDate, heading, description, comment, priority } = await req.json();
    await connectDB();
    const taskToUpdate = await Task.findById(taskId);

    if (!taskToUpdate) {
      return NextResponse.json({error: "Task not found!"}, {status: 404});
    }

    // Update the task fields
    taskToUpdate.heading = heading; 
    taskToUpdate.description = description;
    taskToUpdate.dueDate = dueDate;
    taskToUpdate.comment = comment;
    taskToUpdate.priority = priority;

    // Save the updated task
    const updatedTask = await taskToUpdate.save();

    return NextResponse.json({ message: 'Task updated successfully!', task: updatedTask }, { status: 200 });

  } catch (e: any) {
    console.error('Error in updating the task!');
    return NextResponse.json({error: e.message}, {status: 500});
  }
}