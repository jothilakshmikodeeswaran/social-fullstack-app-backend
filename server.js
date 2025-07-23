import express from "express";
import dotenv from "dotenv";
import db from "./config/connection.js";
import cors from "cors";
import usersRouter from "./routes/users.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use("/api/users", usersRouter);


db.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
