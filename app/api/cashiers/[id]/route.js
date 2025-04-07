// app/api/cashiers/[id]/route.js
import { NextResponse } from 'next/server';
import { Cashier } from '@/models/cashier.model';
import bcryptjs from 'bcryptjs';
import { connectToDatabase } from '@/lib/db';
import mongoose from 'mongoose';

// Connect to database
connectToDatabase();

// Helper function to verify owner token

export async function PUT(request, { params }) {
  try {
    const { username, password, name } = await request.json();
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
    }
    
    if (username && typeof username !== 'string') {
      return NextResponse.json({ message: 'Invalid username' }, { status: 400 });
    }
    
    const updateData = { username, name };

    // ✅ Validate the ID from the route
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
    }

    // ✅ Validate that username is a string (prevents NoSQL injection)
    if (username && typeof username !== 'string') {
      return NextResponse.json({ message: 'Invalid username' }, { status: 400 });
    }

    // If password provided, hash it
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      updateData.password = await bcryptjs.hash(password, salt);
    }

    // Check if new username already exists (excluding the current user)
    if (username) {
      const existingCashier = await Cashier.findOne({
        username: username.trim(),
        _id: { $ne: params.id }
      });
      if (existingCashier) {
        return NextResponse.json(
          { message: 'Username already exists' },
          { status: 400 }
        );
      }
    }

    const cashier = await Cashier.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    ).select('-password');

    if (!cashier) {
      return NextResponse.json(
        { message: 'Cashier not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(cashier);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating cashier', error: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(request, { params }) {
  try {
    const cashier = await Cashier.findByIdAndDelete(params.id);
    if (!cashier) {
      return NextResponse.json(
        { message: 'Cashier not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Cashier deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting cashier', error: error.message },
      { status: 500 }
    );
  }
}