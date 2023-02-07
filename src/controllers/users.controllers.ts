import { Request, Response } from "express";
import { IUserDb, IUserRequest } from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.service";
import getUserService from "../services/users/getUser.service";

const createUserController = async (req: Request, res: Response) => {
  const userData = req.validatedBody as IUserRequest;
  const data = await createUserService(userData);
  return res.status(201).json(data);
};

const getUserController = async (req: Request, res: Response) => {
  const userDB = req.validatedUser as IUserDb;
  const data = await getUserService(userDB);

  return res.status(200).json(data);
};

export { createUserController, getUserController };
