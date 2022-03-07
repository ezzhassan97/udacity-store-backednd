import express, { application, NextFunction, Request, Response } from "express";
import {
	productReturnType,
	productCreateType,
	productStore,
} from "../models/products";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const TOKEN_SECRET = "token_secret";
const store = new productStore();

// INDEX FUNCTION for products TABLE
const index = async (req: Request, res: Response) => {
	try {
		const products = await store.index();
		res.json(products);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};
// SHOW FUNCTION for products TABLE
const show = async (req: Request, res: Response) => {
	try {
		const product = await store.show(req.body.id);
		res.json(product);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};
// CREATE NEW product FUNCTION for products TABLE
const create = async (req: Request, res: Response) => {
	try {
		const product: productCreateType = {
			product_name: req.body.product_name,
			price: req.body.price,
		};
		const newproduct = await store.create(product);
		var token = jwt.sign({ product: newproduct }, TOKEN_SECRET);
		res.json(newproduct);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

// CRUD ROUTES for products TABLE
const productRoutes = (app: express.Application) => {
	app.get("/products", index);
	app.get("/products/:id", show);
	app.post("/products", create);
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
