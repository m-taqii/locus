import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/app/lib/db";
import User from "@/models/user.model";

export async function POST(req) {
  await connectDB();
  const { name, businessName, email, password } = await req.json();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  const existing = await User.findOne({ email });
  if (existing) return new Response("User already exists", { status: 400 });

  const hashed = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    businessName,
    email,
    password: hashed,
  });

  return Response.json({ message: "User created", ok: true ,userId: newUser._id });
}