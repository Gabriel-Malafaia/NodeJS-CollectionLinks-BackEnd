import AppDataSource from "../../data-source";
import { Link } from "../../entities/links.entity";

const deleteLinksService = async (id: string) => {
  const linkRepo = AppDataSource.getRepository(Link);
  const response = await linkRepo.delete({ id });
  console.log(id);

  return response;
};

export default deleteLinksService;
