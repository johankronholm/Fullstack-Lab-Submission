import Router from "express";
import { controller } from "../controller/run.js";


export const router = Router();

router.post("/", controller.createRun);
router.get("/", controller.getRuns);
