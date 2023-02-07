import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors";

const isValidUuidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { link_id } = req.params;

  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  const isUuid = regexExp.test(link_id);

  if (!isUuid) {
    throw new AppError("Invalid uuid.", 401);
  }

  next();
};

export default isValidUuidMiddleware;
