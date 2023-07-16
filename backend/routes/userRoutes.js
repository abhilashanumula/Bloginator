import express from "express";
import { authUser, profileUpdate, profileUser, regUser, logoutUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/', regUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/profile',protect, profileUser);
router.put('/profile',protect, profileUpdate);

export default router;