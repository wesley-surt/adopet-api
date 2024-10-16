import express from "express";
import cors from "cors";
import userRoutes from "./users.js";
import animalsRoutes from "./animals.js";

"https://wesley-surt.github.io"

const routes = (app) => {
    const corsOptions = {
        origin: "http://127.0.0.1:5500/",
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
