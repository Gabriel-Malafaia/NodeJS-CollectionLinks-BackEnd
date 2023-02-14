import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICreateLinks, IEditLinks } from "../interfaces/links.interfaces";

const createLinksSchema: SchemaOf<ICreateLinks> = yup.object().shape({
  title: yup.string().max(32).required(),
  description: yup.string().notRequired(),
  url: yup.string().required(),
});

const editLinksSchema: SchemaOf<IEditLinks> = yup.object().shape({
  title: yup.string().max(32).notRequired(),
  description: yup.string().notRequired(),
  url: yup.string().notRequired(),
});

export { createLinksSchema, editLinksSchema };
