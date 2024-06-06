import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
export const getIdFromToken = (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";
    const data: any = jwt.verify(token, process.env.JWT_SECRET!);
    return data.id;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
export const getDataFromToken = (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";
    const data: any = jwt.verify(token, process.env.JWT_SECRET!);
    console.log(data);
    return data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
