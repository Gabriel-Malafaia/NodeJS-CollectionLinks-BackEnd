import { Request, Response, Router } from "express";

const userRoutes = Router();

userRoutes.get("", (req: Request, res: Response) => {
  return res.json({ message: "Oi" });
});

export default userRoutes;
