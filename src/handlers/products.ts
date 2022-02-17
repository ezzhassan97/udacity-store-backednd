import express, { application, NextFunction, Request, Response } from "express";
import { product, productStore } from "../models/products";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const TOKEN_SECRET = "token_secret";
const store = new productStore();

// INDEX FUNCTION for USERS TABLE
const index = async (req: Request, res: Response) => {
	const users = await store.index();
	res.json(users);
};
// SHOW FUNCTION for USERS TABLE
const show = async (req: Request, res: Response) => {
	const user = await store.show(req.body.id);
	res.json(user);
};
// CREATE NEW USER FUNCTION for USERS TABLE
const create = async (req: Request, res: Response) => {
	try {
		const product: product = {
			id: req.body.id,
			name: req.body.name,
			price: req.body.price,
		};
		const newUser = await store.create(product);
		var token = jwt.sign({ user: newUser }, TOKEN_SECRET);
		res.json(token);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

// CRUD ROUTES for USERS TABLE
const productRoutes = (app: express.Application) => {
	app.get("/products", index);
	app.get("/products/:id", show);
	app.post("/products", verifyAuthToken, create);
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

export default productRoutes;
