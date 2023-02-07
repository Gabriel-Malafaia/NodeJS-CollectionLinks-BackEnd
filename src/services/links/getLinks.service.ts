import AppDataSource from "../../data-source";
import { Link } from "../../entities/links.entity";
import { IUserDb } from "../../interfaces/users.interfaces";

const getLinksService = async (user: IUserDb) => {
  const response = await AppDataSource.getRepository(Link)
    .createQueryBuilder("links")
    .leftJoin("links.user", "user")
    .where("user.id = :id", { id: user.id })
    .getMany();

  return response;
};

export default getLinksService;
