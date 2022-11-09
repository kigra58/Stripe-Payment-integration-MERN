import mongoose from "mongoose";

export const dbConn = async (url: string) => {
  try {
    return await mongoose.connect(url);
  } catch (error) {
    console.error("DB Connection Error", error);
  }
};
