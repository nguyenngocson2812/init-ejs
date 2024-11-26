import express from 'express';
const router = express.Router();
import userController from '../../controllers/user.controller.js';

router.get("/", userController.index);
router.get("/add", userController.add);
router.post("/add", userController.addPost);
router.get("/edit/:id", userController.edit);
router.post("/edit/:id", userController.editPost);
router.post("/delete/:id", userController.delete);

export default router;