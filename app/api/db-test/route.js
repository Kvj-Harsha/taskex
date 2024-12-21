import connectToDatabase from "@/lib/mongodb";

export async function GET() {
  try {
    const connection = await connectToDatabase();
    return new Response(JSON.stringify({ message: "Database connected successfully!" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to connect to the database", error: error.message }), {
      status: 500,
    });
  }
}
