import express from "express";
import animalsController from "../controllers/animalsController.js";
import checkToken from "../authentication/token.js";

const router = express.Router();

router
    .get("/animals/search", animalsController.searchByState)
    .get("/animals/query", animalsController.searchByUserId)
    .get("/animals", animalsController.getAllAnimals)
    .get("/animals/:id", checkToken, animalsController.getAnimal)
    .get("/animals/exist/:id", checkToken, animalsController.exist)
    .post("/animals/register", checkToken, animalsController.register)
    .delete("/animals/search", animalsController.deleteAll)
    .delete("/animals/:id", checkToken, animalsController.deleteOne)
    .put("/animals/update", checkToken, animalsController.update);

export default router;
