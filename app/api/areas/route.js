import { connectToDatabase } from "@/lib/db";
import { Area } from "@/models/area.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const areas = await Area.find();
    return NextResponse.json(areas);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch areas" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const area = await Area.create(body);
    return NextResponse.json(area, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to create area" },
      { status: 500 }
    );
  }
}