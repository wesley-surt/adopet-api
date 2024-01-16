import express from "express";
import cors from "cors";
import userRoutes from "./users.js";
import animalsRoutes from "./animals.js";

const routes = (app) => {
    const corsOptions = {
        origin: "https://wesley-surt.github.io",
        credentials: true,
        optionSuccessStatus: 200,
        header: "x-access-token",
    };

    app.get("/", (req, res) => {
        res.status(200).send("welcome from server...");
    });

    app.use(cors(corsOptions), express.json(), userRoutes, animalsRoutes);
};

export default routes;
