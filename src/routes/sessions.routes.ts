import validateSchemaMiddleware from "../middlewares/global/validateSchema";
import emailExistsMiddleware from "../middlewares/users/emailExists.middleware";
import { Router } from "express";
import { loginUserSchema } from "../schemas/sessions.schemas";
import { loginUserController } from "../controllers/sessions.controllers";

const sessionRoutes = Router();

sessionRoutes.post(
  "",
  validateSchemaMiddleware(loginUserSchema),
  emailExistsMiddleware,
  loginUserController
);

export default sessionRoutes;
