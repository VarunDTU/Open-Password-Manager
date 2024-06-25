import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../db/dbConfig";
import { getIdFromToken } from "../../../../helpers/getDataFromToken";
connect();
export async function GET(req: NextRequest) {
  try {
    const userId = await getIdFromToken(req);
    return NextResponse.json({ message: "User found", data: true });
  } catch (error: any) {
    return NextResponse.json({ data: false });
  }
}
