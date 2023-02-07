import { Router } from "express";
import {
  createLinksController,
  deleteLinksController,
  getLinksController,
} from "../controllers/links.controllers";
import validateSchemaMiddleware from "../middlewares/global/validateSchema";
import isAlreadyUrlMiddleware from "../middlewares/links/alreadyUrl.middleware";
import isUrlMiddleware from "../middlewares/links/isUrl.middleware";
import isUserMiddleware from "../middlewares/users/isUser.middleware";
import { createLinksSchema } from "../schemas/links.schemas";

const linksRouter = Router();

linksRouter.post(
  "",
  validateSchemaMiddleware(createLinksSchema),
  isUrlMiddleware,
  isUserMiddleware,
  isAlreadyUrlMiddleware,
  createLinksController
);

linksRouter.get("", isUserMiddleware, getLinksController);
linksRouter.patch("/:link_id")
linksRouter.delete("/:link_id", deleteLinksController)

export default linksRouter;
