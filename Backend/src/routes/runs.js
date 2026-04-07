import Router from "express";
import { controller } from "../controller/run.js";

export const router = Router();

router.post("/", controller.createRun);
router.get("/", controller.getRuns);
router.get("/pb", controller.getPB)
router.put("/", controller.editRun);
router.delete("/", controller.deleteRun);
