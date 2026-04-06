import express from "express";
import { router as usersRouter } from "./user.js"
import { router as runsRouter } from "./runs.js"

const router = express.Router(); 

router.use("/user", usersRouter);
router.use("/runs", runsRouter);

export default router;