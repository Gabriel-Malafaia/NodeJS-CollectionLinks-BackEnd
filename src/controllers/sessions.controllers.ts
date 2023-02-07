import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/sessions.interface";
import { IUserDb } from "../interfaces/users.interfaces";
import loginUserService from "../services/sessions/loginUser.service";

const loginUserController = async (req: Request, res: Response) => {
  const userData = req.validatedBody as IUserLogin;
  const userDatabase = req.validatedUser as IUserDb;
  const data = await loginUserService(userData, userDatabase);
  return res.status(200).json(data);
};

export { loginUserController };
