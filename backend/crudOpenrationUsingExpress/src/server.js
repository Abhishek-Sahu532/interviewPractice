import app from "./app.js";
import connectDb from "./db/db.js";
import { configDotenv } from "dotenv";

configDotenv({ path: ".env" });

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 8080);
    console.log("App is connecting on PORT", process.env.PORT);
  })
  .catch(() => {
    console.log("Error while conecting the database in server.js");
  });
