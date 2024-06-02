import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../db/dbConfig";
import User from "../../../../models/userModel";
connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, password, email } = reqBody;

    const user = await User.findOne({ email });
    if (user)
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      userName: reqBody.username,
      password: hashedPassword,
      email: reqBody.email,
    });
    const updateUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      status: 201,
    });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
