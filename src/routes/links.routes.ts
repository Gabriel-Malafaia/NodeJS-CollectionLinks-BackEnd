import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/global/validateSchema";
import isAlreadyUrlMiddleware from "../middlewares/links/alreadyUrl.middleware";
import isOwnerLinkMiddleware from "../middlewares/links/isOwnerLink.middleware";
import isUrlMiddleware from "../middlewares/links/isUrl.middleware";
import isValidUuidMiddleware from "../middlewares/links/isValidUuid.middleware";
import isUserMiddleware from "../middlewares/users/isUser.middleware";
import { createLinksSchema, editLinksSchema } from "../schemas/links.schemas";
import {
  createLinksController,
  deleteLinksController,
  editLinksController,
  favoriteLinkController,
  getLinksController,
} from "../controllers/links.controllers";

const linksRouter = Router();

linksRouter.post(
  "",
  validateSchemaMiddleware(createLinksSchema),
  isUserMiddleware,
  isUrlMiddleware,
  isAlreadyUrlMiddleware,
  createLinksController
);

linksRouter.get("", isUserMiddleware, getLinksController);

linksRouter.patch(
  "/:link_id",
  validateSchemaMiddleware(editLinksSchema),
  isUserMiddleware,
  isValidUuidMiddleware,
  isOwnerLinkMiddleware,
  editLinksController
);

linksRouter.post(
  "/:link_id/favorite",
  isUserMiddleware,
  isValidUuidMiddleware,
  isOwnerLinkMiddleware,
  favoriteLinkController
);

linksRouter.delete(
  "/:link_id",
  isUserMiddleware,
  isValidUuidMiddleware,
  isOwnerLinkMiddleware,
  deleteLinksController
);

export default linksRouter;
