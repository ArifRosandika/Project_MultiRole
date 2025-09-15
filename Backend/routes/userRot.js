import express from "express";
import { getUserById, getAllUsers, createUser, updateUser, deleteUser } from "../controllers/UsersCon.js";
import { userVerify, onlyAdmin } from "../middleware/UserAuth.js";

const routerUser = express.Router();

routerUser.get("/users", userVerify, onlyAdmin, getAllUsers);
routerUser.get("/users/:id",userVerify, onlyAdmin, getUserById);
routerUser.post("/users", userVerify, onlyAdmin, createUser);
routerUser.patch("/users/:id",userVerify, onlyAdmin, updateUser);
routerUser.delete("/users/:id",userVerify, onlyAdmin, deleteUser);

export default routerUser; 