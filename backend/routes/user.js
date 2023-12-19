import express from "express"
import {  addPlans, findById, loginUser, logout, registerUser, } from "../controllers/userController.js";
import authen from "../middleWare/auth.js";
const router = express.Router();

// register user

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",logout);
router.post("/findById",findById);

router.post('/subscribe', addPlans);
  

export default router