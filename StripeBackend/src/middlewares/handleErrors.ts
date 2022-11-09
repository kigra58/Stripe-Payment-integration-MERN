import { Request, Response, NextFunction } from "express";

const HandleErrors =
  (func: (req: Request, res: Response, next: NextFunction) => void) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      console.log("Triggered", req?.method, " ", req?.originalUrl);
      func(req, res, next);
    } catch (error) {
      console.error("Error Handler", error);
      res.status(400).send(error);
      next(error);
    }
  };

export default HandleErrors;
