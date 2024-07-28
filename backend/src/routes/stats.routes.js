import { Router } from "express";
import { requireAdmin, requireAuth } from "../middlewares/requireAuth.middleware.js";
import { getDashboardInsights } from "../controllers/stats.controller.js";

const statRouter = Router();

statRouter.route('/insights').get(requireAuth, requireAdmin, getDashboardInsights)

export default statRouter;