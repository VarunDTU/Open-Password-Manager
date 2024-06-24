import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../db/dbConfig";
import { getIdFromToken } from "../../../../helpers/getDataFromToken";
import UserEncryptedPasswords from "../../../../models/passwords";

connect();
export async function GET(req: NextRequest) {
  try {
    const userData = await getIdFromToken(req);

    const passwordData = await UserEncryptedPasswords.findOne({
      userId: userData,
    });

    return NextResponse.json({ message: "User found", data: passwordData });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { password, userId, iv } = reqBody;
    const update = await UserEncryptedPasswords.findOneAndUpdate(
      { userId: userId },
      { $push: { encryptedPasswordString: password, iv: iv } },
      { upsert: true }
    );

    // if (UserEncryptedPasswords.exists({ userId: userId }) == null) {
    //   const NewPasswordUser = new UserEncryptedPasswords({
    //     userId: userId,
    //     encryptedPasswordString: [password],
    //   });
    //   const updatedNewPasswordUser = await NewPasswordUser.save();
    // } else {
    // }
    return NextResponse.json({
      message: "Password saved successfully",
      success: true,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}