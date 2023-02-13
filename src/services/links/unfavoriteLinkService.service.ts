import AppDataSource from "../../data-source";
import { FavoriteLinks } from "../../entities/favorite_links.entity";
import { Link } from "../../entities/links.entity";
import { AppError } from "../../errors";

const unfavoriteLinkService = async (id: string) => {
  const linkRepo = AppDataSource.getRepository(Link);
  const favoriteRepo = AppDataSource.getRepository(FavoriteLinks);
  const link = await linkRepo
    .createQueryBuilder("links")
    .leftJoinAndSelect("links.mainTopics", "articles")
    .where("links.id = :id", { id })
    .getOne();

  if (!link.favorite) {
    throw new AppError("Link is already unfavorited.", 400);
  }

  link.mainTopics.forEach(async (elem) => {
    await favoriteRepo.delete({ id: elem.id });
  });

  link.favorite = false;
  await linkRepo.save(link);

  return;
};

export default unfavoriteLinkService;
