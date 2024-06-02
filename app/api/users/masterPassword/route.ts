import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../../../helpers/getDataFromToken";

export async function POST(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    const reqBody = await req.json();
    return NextResponse.json({ message: "User found", data: reqBody });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
