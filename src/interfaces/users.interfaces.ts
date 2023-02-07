import { JwtPayload } from "jsonwebtoken";
import { Link } from "../entities/links.entity";

export interface IJwtPayload extends JwtPayload {
  id: string;
}

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  links: Link[];
}

export interface IShowUser {
  id: string;
  name: string;
  email: string;
}

export interface IUserDb {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}
