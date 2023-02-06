import * as yup from "yup";
import { SchemaOf } from "yup";
import { IShowUser, IUserRequest } from "../interfaces/users.interfaces";

const createUserSchema: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().max(72),
  email: yup.string().email().max(256),
  password: yup.string().max(65),
});

const showUserSchema: SchemaOf<IShowUser> = yup.object().shape({
  createdAt: yup.string(),
  email: yup.string(),
  name: yup.string(),
  id: yup.string(),
});

export { createUserSchema, showUserSchema };
