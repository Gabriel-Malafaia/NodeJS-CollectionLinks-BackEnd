import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  const userData = req.validatedBody as IUserRequest;
  const data = await createUserService(userData);
  return res.status(201).json(data);
};

const getUserController = async (req: Request, res: Response) => {
  return res.status(200).json({ hello: "oi" });
};

export { createUserController, getUserController };
