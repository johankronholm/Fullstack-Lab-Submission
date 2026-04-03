import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import router from "./routes/index.js"


export const app = express(); 

dotenv.config();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(helmet());
app.disable("x-powered-by");
app.use(express.json());
app.use("/api", router);
