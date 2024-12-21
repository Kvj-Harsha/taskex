// /app/api/tasks/route.js
import Task from "@/models/Task";
import connectToDatabase from "@/lib/mongodb";

// Handle GET (List all tasks)
export async function GET() {
  try {
    await connectToDatabase();
    const tasks = await Task.find().populate("assignee");
    return new Response(JSON.stringify({ tasks }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch tasks" }), { status: 500 });
  }
}

// Handle POST (Create a new task)
export async function POST(req) {
  try {
    const { title, description, status, assignee, dueDate } = await req.json();
    
    // Ensure that the assignee and dueDate are valid
    if (!title || !description || !status || !assignee || !dueDate) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    await connectToDatabase();
    
    const task = new Task({ title, description, status, assignee, dueDate });
    await task.save();
    
    return new Response(JSON.stringify({ task }), { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);  // Log the error
    return new Response(JSON.stringify({ error: "Failed to create task" }), { status: 500 });
  }
}