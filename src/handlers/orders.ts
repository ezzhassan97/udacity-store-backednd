import express, { application, NextFunction, Request, Response } from "express";
import { order, orderStore } from "../models/orders";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const TOKEN_SECRET = "token_secret";
const store = new orderStore();

// INDEX FUNCTION for USERS TABLE
const index = async (req: Request, res: Response) => {
	try {
		const users = await store.index();
		res.json(users);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};
// SHOW FUNCTION for USERS TABLE
const show = async (req: Request, res: Response) => {
	try {
		const user = await store.show(req.body.id);
		res.json(user);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};
// CREATE NEW USER FUNCTION for USERS TABLE
const create = async (req: Request, res: Response) => {
	try {
		const order: order = {
			id: req.body.id,
			user_id: req.body.user_id,
		};
		const newUser = await store.create(order);
		var token = jwt.sign({ user: newUser }, TOKEN_SECRET);
		res.json(token);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

// CRUD ROUTES for USERS TABLE
const orderRoutes = (app: express.Application) => {
	app.get("/orders", index);
	app.get("/orders/:id", show);
	app.post("/orders", verifyAuthToken, create);
};

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
	try {
		const authorizationHeader = req.headers.authorization;
		const token = authorizationHeader
			? authorizationHeader.split(" ")[1]
			: "dummytoken";
		const decoded = jwt.verify(token, TOKEN_SECRET);
		return decoded;
		next();
	} catch (error) {
		res.status(401);
	}
};

export default orderRoutes;
