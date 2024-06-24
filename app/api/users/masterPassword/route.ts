import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
import { connect } from "../../../../db/dbConfig";
import User from "../../../../models/userModel";
connect();

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    var data = jwt.decode(token.value, { complete: true }).payload;
    if (typeof data === "string") {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    if (!data.MasterPassword || !data.masterPasswordString || !data.id) {
      //console.log(data);
      return NextResponse.json(
        {
          message: "masterPassword does not exist for this account",
          success: false,
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      message: "MasterPassword passed successfully",
      sucess: true,
    });

    return NextResponse.json(
      {
        message: response,
        data: {
          userId: data.id,
          masterPasswordString: data.masterPasswordString,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  console.log("POST");
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    var data = jwt.decode(token.value, { complete: true }).payload;
    if (typeof data === "string") {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    const { masterPassword } = await req.json();

    const doc = await User.findOneAndUpdate(
      { _id: data.id },
      { MasterPassword: true }
    );
    if (
      !validator.isAlphanumeric(masterPassword) ||
      !validator.isLength(masterPassword, { max: 10 })
    ) {
      return NextResponse.json(
        { message: "Invalid Master Password or longer than 10" },
        { status: 401 }
      );
    }
    data = {
      ...data,
      MasterPassword: true,
      masterPasswordString: masterPassword,
    };
    const jwt_token = jwt.sign(data, process.env.JWT_SECRET);
    cookieStore.set("token", jwt_token, { httpOnly: true });

    return NextResponse.json(
      {
        message: "MasterPassword saved successfully",
        sucess: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
