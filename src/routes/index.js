import express from "express";
import cors from "cors";
import userRoutes from "./users.js";
import animalsRoutes from "./animals.js";

"https://wesley-surt.github.io"

const routes = (app) => {
    const corsOptions = {
        origin: "127.0.0.1:5500",
        credentials: true,
        optionSuccessStatus: 200,
        header: "authorization",
    };

    app.use(cors(), express.json(), userRoutes, animalsRoutes);
};

export default routes;
