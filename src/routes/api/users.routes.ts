import { Router, Request, Response } from "express";

import authenticateMiddleware from "../../middleware/authentication.middleware";
import * as controller from "../../controllers/users.controllers";

const routes = Router();
routes
	.route("/")
	.get(authenticateMiddleware, controller.index)
	.post(controller.create);
routes.get("/:id", authenticateMiddleware, controller.show);
routes.post("/authenticate", controller.authenticate);

routes.get("/hello", controller.hello);

export default routes;
