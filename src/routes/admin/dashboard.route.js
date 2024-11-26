import express from 'express';
const router = express.Router();
import dashboardController from '../../controllers/dashboard.controller.js';
router.get("/dashboard", dashboardController.index);

export default router;