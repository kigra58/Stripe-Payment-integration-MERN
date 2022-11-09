import express from "express";
import { paymentRoutes } from "./routes/PaymentsRoutes";

const app = express();

app.use("/payments", paymentRoutes);

export default app;
