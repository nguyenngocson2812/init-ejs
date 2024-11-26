import dashboardRouter from "./dashboard.route.js";
import userRoutes from './user.route.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
const adminRoutes = (app) => {
  app.use(authMiddleware.requireAuth);
  app.use("/admin", dashboardRouter);
  app.use("/admin/users", userRoutes);
}
export default adminRoutes