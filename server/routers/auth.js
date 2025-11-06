import express from "express";
import { register, login, getMe } from "../controllers/auth.js";
import { authentication } from "../middlewares/authentication.js";

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/me", authentication, getMe);

export default usersRouter;
