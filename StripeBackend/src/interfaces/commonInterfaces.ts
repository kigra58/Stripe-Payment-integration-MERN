export declare interface ResponseObject {
  success: boolean;
  message?: string;
  data?: unknown;
  token?: Object;
  error?: unknown;
}

export interface ICreteCustomerPayload {
  product: IProduct;
  token: IToken;
}

export interface IProduct {
  name: string;
  price: number;
  description: string;
}

export interface Card {
  id: string;
  object: string;
  address_city: string;
  address_country: string;
  address_line1: string;
  address_line1_check: string;
  address_line2?: any;
  address_state: string;
  address_zip: string;
  address_zip_check: string;
  brand: string;
  country: string;
  cvc_check: string;
  dynamic_last4?: any;
  exp_month: number;
  exp_year: number;
  funding: string;
  last4: string;
  name: string;
  tokenization_method?: any;
}

export interface IToken {
  id: string;
  object: string;
  card: Card;
  client_ip: string;
  created: number;
  email: string;
  livemode: boolean;
  type: string;
  used: boolean;
  currency: string;
  description: string;
  default_source: string;
}

declare namespace Express {
  export interface Request {
    rawBody: any;
  }
}
