import {
  ICreteCustomerPayload,
  ResponseObject,
} from "../interfaces/commonInterfaces";
import { v4 as uuidv4 } from "uuid";
import Stripe from "stripe";
import { config } from "dotenv";

config();

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2022-08-01",
  timeout: 20 * 1000,
});

class PaymentService {
  /**
   * Standard response object
   */
  private response: ResponseObject | undefined;

  /*
    Make  Payments
   */

  async createCustomer(payload: ICreteCustomerPayload) {
    try {
      const { product, token } = payload;

      // console.log("PRODUCT", product);
      console.log("TOKEN", token);

      // Create Customer

      const params: Stripe.CustomerCreateParams = {
        email: token.email,
        source: token.id,
        description: product.description,
      };

      const customer: Stripe.Customer = await stripe.customers.create(params);

      console.log("customer-->", customer);

      const createCharge = await stripe.charges.create({
        amount: product.price,
        currency: "usd",
        customer: customer.id,
        description: customer.description as string,
        source: customer.default_source as string,
      });

      // console.log("createCharge", createCharge);

      // const invoice = await stripe.invoices.retrieve("cus_MjqJVkwbVyuZoL");

      // const customerList = await stripe.customers.list();

      // console.log("customerList", customerList.data);s
      // console.log("invoice", invoice);

      if (createCharge) {
        console.log("createCharge-->", createCharge);
        this.response = {
          success: true,
          message: "",
          data: createCharge,
        };
      }
      return this.response;
    } catch (error) {
      console.error("Error", error);
      this.response = {
        success: false,
        error: error,
      };
    }
  }

  /*
    Payment Method
   */

  async paymentMethod(payload: any) {
    try {
      /*
        Create Payment Method
     */
      const paymentMethod = await stripe.paymentMethods.create({
        type: "card",
        card: {
          number: "4242424242424242",
          exp_month: 11,
          exp_year: 2022,
          cvc: "123",
        },
      });

      /*
        Retrive Payment Method
     */
      // const retrivePaymentMethod = await stripe.paymentMethods.retrieve(
      //   "pm_1M0Oq0SEetQnMJw8ErmRU24g"
      // );
      console.log("paymentMethod", paymentMethod);

      /*
        Update Payment Method
     */
      // const updatePaymentMethod = await stripe.paymentMethods.update(
      //   "pm_1Lw6Db2eZvKYlo2CsbAYSXpj",
      //   { metadata: { order_id: "6735" } }
      // );
      /*
        List Payment Method
     */
      // const paymentMethods = await stripe.paymentMethods.list({
      //   customer: "cus_9BoKyB2Km2T7TE",
      //   type: "card",
      // });

      if (paymentMethod) {
        console.log("customer", paymentMethod);
        this.response = {
          success: true,
          message: "",
          data: paymentMethod,
        };
      }
    } catch (error) {
      console.error("Error", error);
      this.response = {
        success: false,
        message: "",
      };
    }
    return this.response;
  }

  /*
    Save  Payments
   */

  async createChages(payload: any) {
    try {
      /*
        Create Charges
     */
      const createCharge = await stripe.charges.create({
        customer: "cus_MjtLvM6h3Jkmsc",
        amount: 2000,
        description: "My First Test Charge ",
        currency: "usd",
        // source: "visa",
      });
      console.log("createCharge", createCharge);
      /*
        Retrive Charges

      */
      // const retriveCharges = await stripe.charges.retrieve(
      //   "ch_3M0NDf2eZvKYlo2C0kGPdJti"
      // );
      /*
        Update Charges
      */
      // const updateCharge = await stripe.charges.update(
      //   "ch_3M0NQ32eZvKYlo2C0ia8ZnFT",
      //   { metadata: { order_id: "6735" } }
      // );
      // console.log("updateCharge", updateCharge);
      // this.response = {
      //   success: true,
      //   message: "",
      //   data: retriveCharges,
      // };
    } catch (error) {
      console.error("Error", error);
      this.response = {
        success: false,
        message: "",
      };
    }
    return this.response;
  }

  /*
    Retrive  Payments
   */

  async paymentIntent(payload: any) {
    try {
      /*
       Create  Payments Intent
      */
      const CreatePaymentIntent = await stripe.paymentIntents.create({
        amount: 2000,
        currency: "usd",
        payment_method_types: ["card"],
      });

      // console.log("paymentIntent", retrivePaymentIntent);
      /*
       Retrive  Payments Intent
      */

      // const retrivePaymentIntent: Stripe.PaymentIntent =
      //   await stripe.paymentIntents.retrieve("pi_3M0OAjSEetQnMJw80i1XG9t2", {
      //     expand: ["customer"],
      //   });

      /*
       Update Payments Intent
      */

      // const updatePaymentIntent = await stripe.paymentIntents.update(
      //   "pi_1Dsgcw2eZvKYlo2C55F7MPTE",
      //   { metadata: { order_id: "6735" } }
      // );

      // if (retrivePaymentIntent) {
      //   console.log("paymentIntent", retrivePaymentIntent);
      // }

      if (CreatePaymentIntent) {
        console.log("CreatePaymentIntent", CreatePaymentIntent);
        this.response = {
          success: true,
          message: "",
          data: CreatePaymentIntent,
        };
      }
    } catch (error) {
      console.error("Error", error);
      this.response = {
        success: false,
        message: "",
      };
    }
    return this.response;
  }

  /*
    Save  Payments
   */

  async savePayments(payload: any) {
    try {
      return this.response;
    } catch (error) {
      console.error("Error", error);
      this.response = {
        success: false,
        message: "",
      };
      return this.response;
    }
  }

  /*
    Refund Payments
   */

  async refundPayments(payload: any) {
    try {
      /*
       create refunds
      */

      const refund = await stripe.refunds.create({
        charge: "ch_3M0NDf2eZvKYlo2C0kGPdJti",
      });

      /*
       retrive refunds
      */

      // const refundList = await stripe.refunds.retrieve(
      //   're_3M0NDf2eZvKYlo2C0x75FPgb'
      // );

      /*
          update refunds
      */

      // const refund = await stripe.refunds.update(
      //   're_3M0NDf2eZvKYlo2C0x75FPgb',
      //   {metadata: {order_id: '6735'}}
      // );

      console.log("refund", refund);
    } catch (error) {
      console.error("Error", error);
      this.response = {
        success: false,
        message: "",
      };
      return this.response;
    }
  }

  /*
    Subscription  Payments
   */

  async paymentSubscription(payload: ICreteCustomerPayload) {
    try {
      const { product, token } = payload;

      // const subscriptions = await stripe.subscriptions.list({
      //   limit: 5,
      // });

      // console.log("subscriptions", subscriptions);

      // const getSubscription = await stripe.subscriptions.retrieve(
      //   "sub_1M1ShwDn8mRwd4X1lkV8NsSC"
      // );

      // console.log("getSubscription", getSubscription);

      const params: Stripe.CustomerCreateParams = {
        email: token.email,
        source: token.id,
        description: product.description,
      };

      const createProduct = await stripe.products.create({
        name: product.name,
      });

      console.log("CREATE", createProduct);
      const CreateCustomer: Stripe.Customer = await stripe.customers.create(
        params
      );
      console.log("CreateCustomer", CreateCustomer);

      const createPrice = await stripe.prices.create({
        unit_amount: product.price,
        currency: "usd",
        recurring: { interval: "day" },
        product: createProduct.id,
      });

      console.log("PRICE", createPrice);

      const createSubscription = await stripe.subscriptions.create({
        customer: CreateCustomer.id,
        items: [{ price: createPrice.id }],
      });

      if (createSubscription) {
        console.log("createSubscription", createSubscription);
        this.response = {
          success: true,
          message: "",
          data: createSubscription,
        };
      }
    } catch (error) {
      console.error("Error", error);
      this.response = {
        success: false,
        message: "",
      };
    }
    return this.response;
  }

  /*
    Refund Payments
   */

  async stripeWebhook(req: any, res: any) {
    try {
      const header = req.headers["stripe-signature"];
      console.log("header", header);
      const secret = process.env.STRIPE_SIGNING_SECRET as string;
      const event = stripe.webhooks.constructEvent(req.body, header, secret);
      if (event) {
        console.log("eventtttt", event);
      }

      // const webhookEndpoints = await stripe.webhookEndpoints.list({
      //   limit: 3,
      // });
      // if (webhookEndpoints) {
      //   console.log("webhookEndpoints", webhookEndpoints);
      // }
      // const webhookEndpoint = await stripe.webhookEndpoints.create({
      //   url: "http://localhost:3015/payments/stripe-webhook",
      //   enabled_events: ["charge.failed", "charge.succeeded"],
      // });
      // const webhookEndpoint = await stripe.webhookEndpoints.create({
      //   url: "localhost:3015/payments/stripe-webhook",
      //   enabled_events: ["charge.failed", "charge.succeeded"],
      // });
      // console.log("webhookEndpoint", webhookEndpoint);
      // const webhookEndpoint = await stripe.webhookEndpoints.create({
      //   url: "localhost:3015/payments/stripe-webhook",
      //   enabled_events: ["charge.failed", "charge.succeeded"],
      // });
      // console.log("webhookEndpoint", webhookEndpoint);
    } catch (error) {
      console.error("Error", error);
      this.response = {
        success: false,
        message: "",
      };
      return this.response;
    }
  }
}

export default new PaymentService();
