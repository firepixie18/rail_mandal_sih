import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";

export const generateOTP = async () => {
  return crypto.randomInt(1000, 9999);
};

export const generateRandomString = async (length) => {
  return crypto.randomBytes(length);
};
