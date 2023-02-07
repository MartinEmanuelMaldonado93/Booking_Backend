import { Schema, model, Document } from "mongoose";

export interface I_User extends Document {
  userName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model<I_User>("User", UserSchema);
