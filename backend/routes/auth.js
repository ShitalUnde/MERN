import express from "express";
import { loginUser, registerUser } from "../controllers/authControllers.js";

const router = express.Router();

router.route("/login").get(loginUser);
router.route("/register").post(registerUser);

export default router;

// exporting router default so in app.js it can import with any name
