import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../db/dbConfig";
import {
  getDataFromToken,
  getIdFromToken,
} from "../../../../helpers/getDataFromToken";
import UserEncryptedPasswords from "../../../../models/passwords";

connect();
export async function GET(req: NextRequest) {
  try {
    const userData = await getDataFromToken(req);

    const passwordData = await UserEncryptedPasswords.findOne({
      _id: userData._id,
    });
    return NextResponse.json({ message: "User found", data: passwordData });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { password } = reqBody;
    const userId = getIdFromToken(req);
    const update = await UserEncryptedPasswords.findOneAndUpdate(
      { userId: userId },
      { $push: { encryptedPasswordString: password } },
      { upsert: true }
    );
    return NextResponse.json({
      message: "Password saved successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}