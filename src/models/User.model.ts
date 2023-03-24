import { Schema, model, Document, HydratedDocument } from "mongoose";

export interface I_User {
  userName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const UserSchema = new Schema<I_User>(
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
