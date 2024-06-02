import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../db/dbConfig";
import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import UserEncryptedPasswords from "../../../../models/passwords";
connect();
export async function GET(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    console.log(userId);
    const passwordData = await UserEncryptedPasswords.findOne({ userId });
    return NextResponse.json({ message: "User found", data: passwordData });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
