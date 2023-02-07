import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Link } from "../../entities/links.entity";
import { AppError } from "../../errors";
import { IUserDb } from "../../interfaces/users.interfaces";

const isOwnerLinkMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.validatedUser as IUserDb;
  const { link_id } = req.params;

  const findLink = await AppDataSource.getRepository(Link)
    .createQueryBuilder("link")
    .innerJoin("link.user", "user")
    .where("user.id = :id", { id })
    .andWhere("link.id = :link_id", { link_id })
    .getOne();

  if (!findLink) {
    throw new AppError("Link not found.", 404);
  }

  next();
};

export default isOwnerLinkMiddleware;
