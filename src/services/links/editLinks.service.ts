import AppDataSource from "../../data-source";
import { isUri } from "valid-url";
import { Link } from "../../entities/links.entity";
import { AppError } from "../../errors";
import { IEditLinks } from "../../interfaces/links.interfaces";

const editLinksService = async (payload: IEditLinks, id: string) => {
  if (!payload.title && !payload.url) {
    throw new AppError(
      "The body is empty or there are only unrequested elements."
    );
  }

  if (payload.url && !isUri(payload.url)) {
    throw new AppError(
      "Field [url] is invalid, make sure you have the http verb.",
      401
    );
  }

  const linkRepo = AppDataSource.getRepository(Link);
  const newLink = linkRepo.save({ id, ...payload });
  return newLink;
};

export default editLinksService;
