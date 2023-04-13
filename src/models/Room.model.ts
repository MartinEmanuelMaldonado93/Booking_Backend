import { Schema, model } from "mongoose";

export interface I_Room {
  title: string;
  price: string;
  maxPeople: number;
  desc: number;
  roomNumber: { numberRoom: number; unavailableDates: string[] }[];
}

const RoomSchema = new Schema<I_Room>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: Number,
      required: true,
    },
    roomNumber: [{ number: Number, unavailableDates: { type: [String] } }],
  },
  { timestamps: true }
);

export default model<I_Room>("Room", RoomSchema);
