import express, { Request, Response } from "express";

import { DashboardQueries } from "../services/dashboard";

const dashboardRoutes = (app: express.Application) => {
	app.get("/products_in_orders", productsInOrders);
	app.get("/users_with_orders", usersWithOrders);
	app.get("/five-most-expensive", fiveMostExpensive);
};

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
	try {
		const products = await dashboard.productsInOrders();
		res.json(products);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

const usersWithOrders = async (_req: Request, res: Response) => {
	try {
		const users = await dashboard.usersWithOrders();
		res.json(users);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};
const fiveMostExpensive = async (_req: Request, res: Response) => {
	try {
		const users = await dashboard.fiveMostExpensive();
		res.json(users);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

export default dashboardRoutes;
