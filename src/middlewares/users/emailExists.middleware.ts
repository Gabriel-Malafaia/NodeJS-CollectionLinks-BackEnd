import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";

const emailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const { originalUrl: path } = req;

  const emailExists = await AppDataSource.getRepository(User)
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.links", "links")
    .where("user.email = :email", { email })
    .getOne();

  if (emailExists && path == "/users") {
    throw new AppError("User already registered.", 409);
  }

  if (!emailExists && path == "/session") {
    throw new AppError("Email or password is invalid.", 401);
  }

  req.validatedUser = emailExists;
  return next();
};

export default emailExistsMiddleware;
