// app/api/cashiers/route.js
import { NextResponse } from 'next/server';
import { Cashier } from '@/models/cashier.model';
import bcryptjs from 'bcryptjs';
import { connectToDatabase } from '@/lib/db';
connectToDatabase();
export async function POST(request) {
  try {
    const { username, password, name } = await request.json();
    const existingCashier = await Cashier.findOne({ username });
    if (existingCashier) {
      return NextResponse.json(
        { message: 'Username already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create cashier
    const cashier = await Cashier.create({
      username,
      password: hashedPassword,
      name
    });
    const { password: _, ...cashierData } = cashier.toObject();
    return NextResponse.json(cashierData, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating cashier', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cashiers = await Cashier.find().select('-password');
    return NextResponse.json(cashiers);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching cashiers', error: error.message },
      { status: 500 }
    );
  }
}