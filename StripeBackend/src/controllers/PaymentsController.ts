import { Request, Response } from "express";
import PaymentService from "../services/PaymentService";

export const createCustomer = async (req: Request, res: Response) => {
  const resp = await PaymentService.createCustomer(req.body);

  res.status(200).send(resp);
};

export const createChages = async (req: Request, res: Response) => {
  const resp = await PaymentService.createChages(req.body);
  res.status(200).send(resp);
};

export const savePaymentDetails = async (req: Request, res: Response) => {
  const resp = await PaymentService.savePayments(req.body);

  res.status(200).send(resp);
};

export const paymentIntent = async (req: Request, res: Response) => {
  const resp = await PaymentService.paymentIntent(req.body);

  res.status(200).send(resp);
};

export const refundPayments = async (req: Request, res: Response) => {
  const resp = await PaymentService.refundPayments(req.body);

  res.status(200).send(resp);
};

export const paymentMethod = async (req: Request, res: Response) => {
  const resp = await PaymentService.paymentMethod(req.body);

  res.status(200).send(resp);
};

export const paymentSubscription = async (req: Request, res: Response) => {
  const resp = await PaymentService.paymentSubscription(req.body);

  res.status(200).send(resp);
};

export const stripeWebHooks = async (req: Request, res: Response) => {
  const resp = await PaymentService.stripeWebhook(req, res);

  res.status(200).send(resp);
};
