import express from "express";
import UsersController from "../controllers/usersController.js";
import checkToken from "../authentication/token.js";

const router = express.Router();

router
    .get("/users/:id", checkToken, UsersController.return)
    .post("/users/exists", UsersController.exists)
    .post("/users/login", UsersController.login)
    .post("/users/register", UsersController.register)
    .put("/users/update", checkToken, UsersController.update)
    .delete("/users/:id", checkToken, UsersController.delete);

export default router;
