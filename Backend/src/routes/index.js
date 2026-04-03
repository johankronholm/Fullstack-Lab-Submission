import express from "express";
import { router as usersRouter } from "./user.js"

const router = express.Router(); 

router.use("/user", usersRouter);

export default router;