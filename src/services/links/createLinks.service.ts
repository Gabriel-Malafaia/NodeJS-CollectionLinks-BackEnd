import AppDataSource from "../../data-source";
import { Link } from "../../entities/links.entity";
import { ICreateLinks } from "../../interfaces/links.interfaces";
import { IUserDb } from "../../interfaces/users.interfaces";
import { showLinksSchema } from "../../schemas/links.schemas";

const createLinksService = async (payload: ICreateLinks, user: IUserDb) => {
  const linkRepo = AppDataSource.getRepository(Link);
  const newLink = linkRepo.create({ ...payload, user });
  await linkRepo.save(newLink);

  const response = await showLinksSchema.validate(newLink, {
    stripUnknown: true,
  });

  return response;
};

export default createLinksService;
