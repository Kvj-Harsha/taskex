import connectToDatabase from "@/lib/mongodb";
import Note from "@/models/Note";

export async function GET() {
  try {
    await connectToDatabase();
    const notes = await Note.find();
    return new Response(JSON.stringify(notes), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch notes" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, note } = await req.json();
    
    if (!name || !note) {
      return new Response(JSON.stringify({ error: "Name and Note are required" }), { status: 400 });
    }

    await connectToDatabase();

    const newNote = new Note({
      name,
      note,
    });

    await newNote.save();

    return new Response(JSON.stringify(newNote), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create note" }), { status: 500 });
  }
}
