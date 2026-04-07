import express from "express"
import { controller } from "../controller/user.js"

export const router = express.Router(); 

router.post("/", controller.createUser); 
router.post("/login", controller.loginUser);
router.get("/", controller.getPB);