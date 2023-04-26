import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
  } catch (error) {
    throw error;
  }
};

export const database = mongoose.connection;

database.on(
  "error",
  console.error.bind(console, "❌ mongodb connection error")
);
database.on("disconnected", () => console.log("mongoDB disconnected!"));
database.once("open", () => console.log("✅ mongodb connected successfully"));

// mongoose.Promise = Promise;
