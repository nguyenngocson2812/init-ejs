import homeRouter from "./home.route.js";
import authRouter from "./auth.route.js";
const clientRoutes = (app) => {
  app.use("/", homeRouter);
  app.use("/auth", authRouter);
}
export default clientRoutes;