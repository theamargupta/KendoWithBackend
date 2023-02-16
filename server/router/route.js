import { Router } from "express";
const router = Router();

//  import all controllers
import * as controller from "../controllers/appController.js";

//  POST Methods
router.route("/register").post(controller.register); // register user
router.route("/login").post(controller.login); // login user

// GET Methods
router.route("/getChartData").get(controller.getChartData);
router.route("/getOrders").get(controller.getOrders);
router.route("/getChartCategories").get(controller.getChartCategories);
// Put Methods

export default router;
