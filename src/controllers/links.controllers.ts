import { Request, Response } from "express";
import { ICreateLinks } from "../interfaces/links.interfaces";
import { IUser, IUserDb } from "../interfaces/users.interfaces";
import createLinksService from "../services/links/createLinks.service";
import deleteLinksService from "../services/links/deleteLinks.service";
import editLinksService from "../services/links/editLinks.service";
import getLinksService from "../services/links/getLinks.service";

const createLinksController = async (req: Request, res: Response) => {
  const userData = req.validatedBody as ICreateLinks;
  const userProfile = req.validatedUser as IUserDb;
  const data = await createLinksService(userData, userProfile);
  return res.status(200).json(data);
};

const getLinksController = async (req: Request, res: Response) => {
  const data = await getLinksService(req.validatedUser as IUserDb);
  return res.status(200).json(data);
};

const editLinksController = async (req: Request, res: Response) => {
  const data = await editLinksService("");
  return res.status(200).json(data);
};

const deleteLinksController = async (req: Request, res: Response) => {
  const data = await deleteLinksService();
  return res.status(200).json(data);
};

export {
  createLinksController,
  getLinksController,
  editLinksController,
  deleteLinksController,
};
