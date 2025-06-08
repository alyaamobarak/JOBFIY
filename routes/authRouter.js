import { Router } from "express";
import {validateRegisterUser ,validateLoginUser} from '../middleware/validationMiddleware.js'
const router = Router();
import { register, login } from "../controllers/authController.js";
import { logout } from '../controllers/authController.js';

router.post("/register", validateRegisterUser, register);
router.post("/login",validateLoginUser, login);
router.get("/logout", logout);

export default router;