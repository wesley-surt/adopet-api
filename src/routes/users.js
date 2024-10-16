import express from "express";
import UsersController from "../controllers/usersController.js";
import checkTonken from "../authentication/token.js";

const router = express.Router();

router
    .get("/users/:id", UsersController.return)
    .post("/users/exists", UsersController.exists)
    .post("/users/login", UsersController.login)
    .post("/users/register", UsersController.register)
    .put("/users/update", UsersController.update)
    .delete("/users/:id", UsersController.delete);

export default router;
