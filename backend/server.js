import express from "express";
import { connectdb } from "./config/db.js";
import cors from "cors";
import userrouter from "./routes/user_routes.js";

const app = express();
app.use(express.json());
connectdb();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api", userrouter);
app.listen(2700, () => {
  console.log("server started");
});
