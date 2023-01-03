import { Router } from "express";
const router = Router();

//  import all controllers
import * as controller from "../controllers/appController.js";

//  POST Methods
router.route("/register").post(controller.register); // register user

// GET Methods
router.route("/user/:email").get(controller.getUser); // user with email

// Put Methods

export default router;
