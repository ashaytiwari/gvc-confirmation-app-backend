import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    tokenData: {
      tokenId: String,
      expiresAt: String
    },
    role: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('Users', userSchema);