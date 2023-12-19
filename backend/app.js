import express from "express";
import { config } from "dotenv";
import {dbConnect} from "./database/dbConnect.js"
import userRouter from "./routes/user.js"
import {errorMiddleWare} from "./middleWare/error.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import Stripe from "stripe";



config();
const app = express();

const secretKey = process.env.SECRET_KEY;
export const stripeInstance =new Stripe(secretKey);

// middleWare
app.use(express.json())
app.use(cookieParser())


app.use(
  cors()
);

// routes 
app.use("/api/user",userRouter)

app.use(errorMiddleWare)
app.listen(4000, () => {
  dbConnect();
  console.log("Server is running");
});
