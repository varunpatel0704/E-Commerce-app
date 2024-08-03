import { Router } from "express";
import { requireAdmin, requireAuth } from "../middlewares/requireAuth.middleware.js";
import { getDashboardInsights } from "../controllers/stats.controller.js";

const statsRouter = Router();

statsRouter.route('/insights').get(requireAuth, requireAdmin, getDashboardInsights)

export default statsRouter;