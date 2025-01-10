import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.static());
app.use(bodyParser.json());
app.use(cookieParser());

import userRoutes from "./routes/user.routes.js";

app.use("/api/v1", userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

export default app;
