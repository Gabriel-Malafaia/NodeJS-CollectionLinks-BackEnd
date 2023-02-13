import { Request, Response } from "express";
import { ICreateLinks, IEditLinks } from "../interfaces/links.interfaces";
import { IUserDb } from "../interfaces/users.interfaces";
import createLinksService from "../services/links/createLinks.service";
import deleteLinksService from "../services/links/deleteLinks.service";
import editLinksService from "../services/links/editLinks.service";
import favoriteLinkService from "../services/links/favoriteLink.service";
import getLinksService from "../services/links/getLinks.service";

const createLinksController = async (req: Request, res: Response) => {
  const userData = req.validatedBody as ICreateLinks;
  const userProfile = req.validatedUser as IUserDb;
  const data = await createLinksService(userData, userProfile);
  return res.status(201).json(data);
};

const getLinksController = async (req: Request, res: Response) => {
  const data = await getLinksService(req.validatedUser as IUserDb);
  return res.status(200).json(data);
};

const editLinksController = async (req: Request, res: Response) => {
  const userData = req.validatedBody as IEditLinks;
  const { link_id } = req.params;
  const data = await editLinksService(userData, link_id);
  return res.status(200).json(data);
};

const favoriteLinkController = async (req: Request, res: Response) => {
  const { link_id } = req.params;
  const data = await favoriteLinkService(link_id);
  return res.status(200).json(data);
};

const deleteLinksController = async (req: Request, res: Response) => {
  const { link_id } = req.params;
  const data = await deleteLinksService(link_id);
  return res.status(204).json(data);
};

export {
  createLinksController,
  getLinksController,
  editLinksController,
  deleteLinksController,
  favoriteLinkController
};
