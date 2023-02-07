import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserLogin } from "../interfaces/sessions.interface";

const loginUserSchema: SchemaOf<IUserLogin> = yup.object().shape({
  email: yup.string().email().required().max(256),
  password: yup.string().max(65),
});

export { loginUserSchema };
