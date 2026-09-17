import express from "express";
import cors from "cors";

import requestLogger from "./middleware/requestLogger.middleware";
import errorMiddleware from "./middleware/error.middleware";

import userRouter from "./routes/user.routes.js";
import { error } from "node:console";

const app = express();

app.use(cors());
app.use(express.json()); //parse req json

app.use(requestLogger);

app.use((req, res, next) => {
    console.log("Middleware passed");

    next();
});

app.use("/users", userRouter);

app.use(errorMiddleware);

app.get("/health",(_req, res) => { //_req - ignores request
    res.json({
        status: "ok"
    });
});

app.post("/echo/:id",(req,res) => {
    res.json(req.params.id);
});

export default app;