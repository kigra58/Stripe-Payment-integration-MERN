import express, { Application } from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConn } from "./db/dbConnection";
import Router from "./Router";

config();

const app: Application = express();

dbConn(process.env.DB_URL as string);

app.use("/payments/stripe-webhook", express.raw({ type: "*/*" }));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/", Router);

try {
  app.listen(process.env.PORT, (): void => {
    console.log(`Connected successfully on port ${process.env.PORT}`);
  });
} catch (error) {
  console.error(`Error occured: ${error}`);
}
