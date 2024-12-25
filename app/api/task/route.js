// This is the main server-side logic for task management. Update this if any fields or logic changes.
import connectToDatabase from "@/lib/mongodb";
import Task from "@/models/Task";

export async function GET(req) {
  try {
    await connectToDatabase();
    const tasks = await Task.find({});
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.error("GET /api/task Error:", error.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, description, assignee, assignedBy, dueDate, priority, category } = body;

    if (!title || !description || !assignee || !assignedBy || !dueDate) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    await connectToDatabase();

    const newTask = await Task.create({
      title,
      description,
      assignee,
      assignedBy,
      dueDate,
      priority: priority || "Medium",
      category: category || "Other",
      status: "To Do",
    });

    return new Response(JSON.stringify(newTask), { status: 201 });
  } catch (error) {
    console.error("POST /api/task Error:", error.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: "Task ID is required" }), { status: 400 });
    }

    await connectToDatabase();
    await Task.findByIdAndDelete(id);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("DELETE /api/task Error:", error.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
