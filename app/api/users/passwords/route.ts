import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../db/dbConfig";
import { getDataFromToken } from "../../../../helpers/getDataFromToken";
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
