import { connectToDatabase } from "@/lib/db";
import { Area } from "@/models/area.model";
import { Customer } from "@/models/customer.model";

import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const customer = await Customer.findById(params.id).populate('area');
    
    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }
    
    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch customer" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    await connectToDatabase();
    
    const updatedCustomer = await Customer.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    ).populate('area');
    
    if (!updatedCustomer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }
    
    return NextResponse.json(updatedCustomer);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to update customer" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const deletedCustomer = await Customer.findByIdAndDelete(params.id);
    if(deletedCustomer){
      await Area.findByIdAndUpdate(customer.area, { $inc: { customerCount: -1 } });
        }
    if (!deletedCustomer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Customer deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete customer" },
      { status: 500 }
    );
  }
}