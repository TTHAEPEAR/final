import express from "express";
import cors from "cors";

import ItemRoute from "./routes/items.js";

const app = express();
const PORT = 5000 || process.env.PORT;

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow request from other origin (Frontend which is at different port)
app.use(cors());

// use routes
app.use("/items", ItemRoute);

export default app;
