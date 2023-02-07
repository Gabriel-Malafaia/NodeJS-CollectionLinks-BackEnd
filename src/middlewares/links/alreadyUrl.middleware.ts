import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { ICreateLinks } from "../../interfaces/links.interfaces";

const isAlreadyUrlMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, url } = req.validatedBody as ICreateLinks;

  const findLink = await AppDataSource.getRepository(User)
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.links", "links")
    .where("links.title = :title", { title })
    .orWhere("links.url = :url", { url })
    .getOne();

  if (findLink) {
    throw new AppError("Link's title or url is already saved.", 409);
  }

  next();
};

export default isAlreadyUrlMiddleware;
