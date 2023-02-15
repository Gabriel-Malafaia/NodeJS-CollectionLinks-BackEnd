import AppDataSource from "../../data-source";
import webScraping from "../../middlewares/global/scraping";
import { FavoriteLinks } from "../../entities/favorite_links.entity";
import { Link } from "../../entities/links.entity";
import { AppError } from "../../errors";

export interface ICreateFavorite {
  name: string;
  url: string;
}

const favoriteLinkService = async (id: string) => {
  const linkRepo = AppDataSource.getRepository(Link);
  const favoriteRepo = AppDataSource.getRepository(FavoriteLinks);

  const link = await linkRepo.findOneBy({ id });
  const { url } = link;
  const articles = await webScraping(url);

  if (link.favorite) {
    throw new AppError("Link is already in your favorite links.", 409);
  }

  if (articles) {
    const favorites: any = await Promise.all(
      articles.map(async (elem) => {
        const favoriteLink: ICreateFavorite = elem;
        const newFavorite = favoriteRepo.create({
          ...favoriteLink,
          link: { ...link },
        });
        await favoriteRepo.save(newFavorite);

        return newFavorite;
      })
    );

    link.mainTopics = favorites;
  }

  link.favorite = true;
  await linkRepo.save(link);

  const response = await linkRepo
    .createQueryBuilder("links")
    .leftJoinAndSelect("links.mainTopics", "article")
    .where("links.id = :id", { id })
    .getOne();

  return response;
};

export default favoriteLinkService;
