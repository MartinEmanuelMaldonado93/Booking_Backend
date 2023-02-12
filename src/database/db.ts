import mongoose from "mongoose";

export const connect = async () => {
  // if (!process.env.MONGO) {
  //   throw new Error("Please add the MONGO_URL environment variable");
  // }
  
  try {
    await mongoose.connect(process.env.MONGO!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

const database = mongoose.connection;

database.on(
  "error",
  console.error.bind(console, "❌ mongodb connection error")
);
database.on("disconnected", () => console.log("mongoDB disconnected!"));
// database.once("open", () => console.log("✅ mongodb connected successfully"));

mongoose.Promise = Promise;
