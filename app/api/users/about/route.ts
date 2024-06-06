import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../db/dbConfig";
import { getIdFromToken } from "../../../../helpers/getDataFromToken";
import User from "../../../../models/userModel";
connect();
export async function GET(req: NextRequest) {
  try {
    const userId = await getIdFromToken(req);

    const userData = await User.findById({ _id: userId }).select(
      "_id userName email role"
    );

    return NextResponse.json({ message: "User found", data: userData });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

