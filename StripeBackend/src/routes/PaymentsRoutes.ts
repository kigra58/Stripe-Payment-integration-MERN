import express from "express";
import {
  createCustomer,
  stripeWebHooks,
  refundPayments,
  createChages,
  paymentIntent,
  paymentMethod,
  paymentSubscription,
} from "../controllers/PaymentsController";
import HandleErrors from "../middlewares/handleErrors";

export const paymentRoutes = express.Router();

paymentRoutes.post("/create-customer", HandleErrors(createCustomer));
paymentRoutes.post("/payment-method", HandleErrors(paymentMethod));
paymentRoutes.post("/payment-charges", HandleErrors(createChages));
paymentRoutes.post("/payment-intent", HandleErrors(paymentIntent));
paymentRoutes.post("/payment-refunds", HandleErrors(refundPayments));
paymentRoutes.post("/create-subscription", HandleErrors(paymentSubscription));
paymentRoutes.post("/stripe-webhook", HandleErrors(stripeWebHooks));
