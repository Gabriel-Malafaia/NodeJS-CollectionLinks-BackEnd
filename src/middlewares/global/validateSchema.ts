import { NextFunction, Request, Response } from "express";
import { SchemaLike } from "yup/lib/types";
import { AppError } from "../../errors";

const validateSchemaMiddleware =
  (schema: SchemaLike) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await schema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

      req.validatedBody = validated;
      next();
    } catch (err: any) {
      throw new AppError(err.errors);
    }
  };

export default validateSchemaMiddleware;
