import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICreateLinks, IShowLinks } from "../interfaces/links.interfaces";

const createLinksSchema: SchemaOf<ICreateLinks> = yup.object().shape({
  title: yup.string().max(32),
  url: yup.string(),
});

const showLinksSchema: SchemaOf<IShowLinks> = yup.object().shape({
  updatedAt: yup.date(),
  createdAt: yup.date(),
  url: yup.string(),
  title: yup.string(),
  id: yup.string(),
});

export { createLinksSchema, showLinksSchema };
