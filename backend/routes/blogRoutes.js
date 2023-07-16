import express from "express";
// import { authUser, profileUpdate, profileUser, regUser, logoutUser } from "../controllers/userController.js";
// import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
import { createBlog, getOneBlog, getBlog, deleteBlog, blogUpdate } from "../controllers/blogController.js"

router.get('/', getBlog);
router.get('/:id', getOneBlog);
router.post('/create', createBlog);
router.put('/update', blogUpdate);
router.delete('/delete',deleteBlog);

// router.post('/auth', authUser);
// router.post('/logout', logoutUser);
// router.get('/profile',protect, profileUser);
// router.put('/profile',protect, profileUpdate);

export default router;