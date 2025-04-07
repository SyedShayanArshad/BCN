import { connectToDatabase } from "@/lib/db";
import { Customer } from "@/models/customer.model";
import { Area } from "@/models/area.model";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await connectToDatabase();
    console.log("DB connected successfully");
    const customers = await Customer.find().populate("area");
    return NextResponse.json(customers);
  } catch (error) {
    console.error("Error details:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const customer = await Customer.create(body);
    await Area.findByIdAndUpdate(customer.area, { $inc: { customerCount: 1 } });
    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to create customer" },
      { status: 500 }
    );
  }
}