import { NextResponse } from 'next/server';
import Task from '@/models/Task';
import { connectDB } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import redis from "@/lib/redis";

/** 
 * @desc Create Task
 * @route POST /api/task
 * @access private
 */
export async function POST(req: Request) {
  try {

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { heading, description, dueDate, comment, priority } = await req.json();

    const userId = session.user.id;

    // new Task
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
    await redis.del(`userId:${userId}`);

    // Fetch updated tasks from mongoDb
    const updatedTasks = await Task.find({userId});

    await redis.set(`tasks:${userId}`, JSON.stringify(updatedTasks));

    return NextResponse.json({ message: 'Task created successfully', task: savedTask }, { status: 201 });

  } catch (e) {
    console.error('Error in POST request:', e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

/** 
 * @desc Get all Tasks
 * @route GET /api/task
 * @access private
 */
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    let cachedData = await redis.get(`tasks:${userId}`) as string | null;

    let userTasks;
    if (cachedData) {
      if (typeof cachedData === 'string') {
        console.log(cachedData, "This is the cached data")
        try {
          userTasks = JSON.parse(cachedData)
        } catch (err) {
          console.error('Failed to parse cached data:', err)
          userTasks = await Task.find({ userId })
          await redis.set(`tasks:${userId}`, JSON.stringify(userTasks))
        }
      } else {
        userTasks = cachedData
      }
    } else {
      userTasks = await Task.find({ userId });
      await redis.set(`tasks:${userId}`, JSON.stringify(userTasks)); 
    }

    return NextResponse.json({ userTasks }, { status: 200 });
  } catch (e) {
    console.error('Error in task GET request', e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}


/** 
 * @desc Delete a Task
 * @route DELETE /api/task
 * @access private
 */
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const { taskId } = await req.json(); // Expect taskId in the body
    
    const deletedTask = await Task.findByIdAndDelete(taskId);
    await redis.del(`userId:${userId}`)

    if (!deletedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully!" }, { status: 200 });
  } catch (e) {
    console.error('Error in task DELETE request', e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

/** 
 * @desc Update a Task
 * @route PUT /api/task
 * @access private
 */
export async function PUT(req: Request) {

  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

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

    const updatedTask = await taskToUpdate.save();
    await redis.del(`userId:${userId}`);

    const updatedTasksFromCache = await Task.find({userId});

    await redis.set(`tasks:${userId}`, JSON.stringify(updatedTasksFromCache));
    
    return NextResponse.json({ message: 'Task updated successfully!', task: updatedTask }, { status: 200 });

  } catch (e: any) {
    console.error('Error in updating the task!');
    return NextResponse.json({error: e.message}, {status: 500});
  }
}

// const getSession = async () => {
//   return await getServerSession(authOptions);
// }

// type Session = {
//   user: {
//     id: string
//   }
// }
// const getUserId = async (session: Session | any) => {
//   // return session.user.id
//   if (session) {
//     return session.user.id;
//   }
//   throw new Error("User is not authenticated");
// }