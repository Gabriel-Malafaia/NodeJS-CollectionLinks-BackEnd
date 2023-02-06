import "reflect-metadata";
import "express-async-errors";
import express from "express";
import usersRoutes from "./routes/user.routes";
import { errorHandler } from "./errors";
import linksRouter from "./routes/link.routes";

const app = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/links", linksRouter);

app.use(errorHandler);

export default app;
