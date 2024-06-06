import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../db/dbConfig";
import User from "../../../../models/userModel";
connect();
export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    const dataString = jwt.decode(token.value, { complete: true }).payload;
    const data = JSON.parse(typeof dataString === "string" ? dataString : "{}");
    //response.cookies.get("token");
    if (data.MasterPassword || data.MasterPassword === true) {
      console.log(data);
      return NextResponse.json(
        { message: "masterPassword already exist" },
        { status: 401 }
      );
    }
    const doc = await User.findOneAndUpdate(
      { _id: data.id },
      { MasterPassword: true }
    );

    const jwt_token = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    cookieStore.set("token", jwt_token, { httpOnly: true });
    const response = NextResponse.json({
      message: "MasterPassword saved successfully",
      sucess: true,
    });
    return NextResponse.json({ message: response }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
