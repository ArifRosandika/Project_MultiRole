import express from "express";
import { Login, Logout, Me } from "../controllers/AuthCon.js";

const routerAuth = express.Router();

routerAuth.post("/login", Login);
routerAuth.delete("/logout", Logout);
routerAuth.get("/me", Me);

export default routerAuth;