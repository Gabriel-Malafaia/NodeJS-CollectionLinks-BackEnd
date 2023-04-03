import "reflect-metadata";
import "express-async-errors";
import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users.routes";
import linksRouter from "./routes/links.routes";
import sessionRoutes from "./routes/sessions.routes";
import { errorHandler } from "./errors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", usersRoutes);
app.use("/links", linksRouter);
app.use("/session", sessionRoutes);

app.use(errorHandler);

export default app;
