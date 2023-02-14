import { NextFunction, Request, Response } from "express";
import { decode } from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { IJwtPayload } from "../../interfaces/users.interfaces";

const isUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];

  const decoding = decode(token) as IJwtPayload;
  if (!token || !decoding) {
    throw new AppError("Missing authorization.", 401);
  }

  const findUser = await AppDataSource.getRepository(User)
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.links", "links")
    .leftJoinAndSelect("links.mainTopics", "articles")
    .where("user.id = :id", { id: decoding.id })
    .getOne();

  if (!findUser) {
    throw new AppError("Missing authorization.", 401);
  }

  req.validatedUser = findUser;
  next();
};

export default isUserMiddleware;
