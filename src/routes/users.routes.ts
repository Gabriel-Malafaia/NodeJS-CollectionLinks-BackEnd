import validateSchemaMiddleware from "../middlewares/global/validateSchema";
import emailExistsMiddleware from "../middlewares/users/emailExists.middleware";
import { Router } from "express";
import { createUserSchema } from "../schemas/users.schemas";
import {
  createUserController,
  getUserController,
} from "../controllers/users.controllers";
import isUserMiddleware from "../middlewares/users/isUser.middleware";

const usersRoutes = Router();

usersRoutes.post(
  "",
  validateSchemaMiddleware(createUserSchema),
  emailExistsMiddleware,
  createUserController
);

usersRoutes.get("", isUserMiddleware, getUserController);

export default usersRoutes;
