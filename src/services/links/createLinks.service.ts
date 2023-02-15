import AppDataSource from "../../data-source";
import { Link } from "../../entities/links.entity";
import { ICreateLinks } from "../../interfaces/links.interfaces";
import { IUserDb } from "../../interfaces/users.interfaces";

const createLinksService = async (payload: ICreateLinks, user: IUserDb) => {
  const linkRepo = AppDataSource.getRepository(Link);

  const newLink = linkRepo.create({ ...payload, user });
  await linkRepo.save(newLink);

  const response = { ...newLink };
  delete response.user.password;

  return response;
};

export default createLinksService;
