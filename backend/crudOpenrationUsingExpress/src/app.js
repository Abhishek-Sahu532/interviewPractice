import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

import bookRoutes from "./routes/books.routes.js";

app.use("/api/v1", bookRoutes);

export default app;
