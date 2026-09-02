import express from "express";
import cors from "cors";

import authMiddleware from "./middleware/authMiddleware";

import userRouter from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json()); //parse req json

app.use((req, res, next) => {
    console.log("Middleware passed");

    next();
});

app.use("/users", userRouter);

app.get("/health",(_req, res) => { //_req - ignores request
    res.json({
        status: "ok"
    });
});

app.post("/echo/:id",(req,res) => {
    res.json(req.params.id);
});

app.get("/private",authMiddleware,(_req, res) => {
    res.json({
        message: "Authorization passed"
    });
});

export default app;