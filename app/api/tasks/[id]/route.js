// /app/api/tasks/[id]/route.js
export async function PUT({ params, request }) {
    const { id } = params;
    const { status } = await request.json();
  
    try {
      await connectToDatabase();
  
      const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
      if (!task) {
        return new Response(JSON.stringify({ error: "Task not found" }), { status: 404 });
      }
  
      return new Response(JSON.stringify({ task }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Failed to update task" }), { status: 500 });
    }
  }

  // /app/api/tasks/[id]/route.js
export async function DELETE({ params }) {
    const { id } = params;
  
    try {
      await connectToDatabase();
      
      const task = await Task.findByIdAndDelete(id);
      if (!task) {
        return new Response(JSON.stringify({ error: "Task not found" }), { status: 404 });
      }
  
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Failed to delete task" }), { status: 500 });
    }
  }
  
  