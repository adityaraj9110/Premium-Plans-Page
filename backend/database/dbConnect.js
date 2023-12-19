import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_DB_URL);
      console.log("Database Connected");
    } catch (error) {
      console.error("Database Connection Error:", error);
    }
  };