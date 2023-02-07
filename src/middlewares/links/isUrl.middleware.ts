import { NextFunction, Request, Response } from "express";
import { isUri } from "valid-url";
import { AppError } from "../../errors";

const isUrlMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { url } = req.body;

  if (!isUri(url)) {
    throw new AppError(
      "Field [url] is invalid, make sure you have the http verb.",
      401
    );
  }

  next();
};

export default isUrlMiddleware;
