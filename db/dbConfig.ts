import mongoose from "mongoose";
export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () =>
      console.error("connected to the database")
    );
    connection.on("error", (err) => {
      console.error(err);
      process.exit();
    });
  } catch (err) {
    console.error(err);
  }
}
