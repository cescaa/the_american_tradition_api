import express from "express";
import cors from "cors";
import incidentsRouter from "./routes/incidents.js";

const app = express(); // create server

app.use(cors()); // enable CORS for all origins
app.use(express.json()); // parse incoming requests with a JSON body into req.body
app.get("/health", (_req, res) => res.json({ ok: true })); // check server is running correctly
app.use(incidentsRouter);

export default app;
