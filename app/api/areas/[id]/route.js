import { connectToDatabase } from "@/lib/db";
import { Area } from "@/models/area.model";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const body = await request.json();
    await connectToDatabase();
    
    const updatedArea = await Area.findByIdAndUpdate(
      id,
      { name: body.name },
      { new: true }
    );

    if (!updatedArea) {
      return NextResponse.json({ error: "Area not found" }, { status: 404 });
    }

    return NextResponse.json(updatedArea);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to update area" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await connectToDatabase();
    const deletedArea = await Area.findByIdAndDelete(id);

    if (!deletedArea) {
      return NextResponse.json({ error: "Area not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Area deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to delete area" },
      { status: 500 }
    );
  }
}