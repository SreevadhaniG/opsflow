import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json()); //parse req json

app.get("/health",(_req, res) => { //_req - ignores request
    res.json({
        status: "ok"
    });
});

export default app;