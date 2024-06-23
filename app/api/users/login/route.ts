import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../db/dbConfig";
import User from "../../../../models/userModel";
connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { password, email } = reqBody;

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        { message: "User does not exsit exists" },
        { status: 400 }
      );
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.userName,
      role: user.role,
      MasterPassword: user.MasterPassword,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login success",
      sucess: true,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
