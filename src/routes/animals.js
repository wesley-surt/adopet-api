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
    .delete("/animals/search", checkToken, animalsController.deleteAll)
    .delete("/animals/:id", checkToken, animalsController.deleteOne)
    .put("/animals/update", checkToken, animalsController.update);

export default router;
/*
{
    "_id": "675c7fa1d5b571b1fcf46916",
    "userId": "674e34f012fb98cb0bc6c4db",
    "characteristics1": "Alegre",
    "characteristics2": "Dócil",
    "measure": "Médio",
    "status": "Adoção",
    "photo": "açdf5dfa6s5df132s1f564cv.png",
    "state": "São Paulo",
    "size": "45cm",
    "name": "Samanta",
    "city": "São Tomé",
    "age": "1",
    "cep": "23555444",
    "about": "É um animal muito amigável e carinhoso, gosta de brincar em campos abertos",
    "__v": 0
}
*/