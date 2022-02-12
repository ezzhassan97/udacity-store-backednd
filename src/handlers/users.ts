import express, { application, NextFunction, Request, Response } from "express";
import { User, userStore } from "../models/users";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const TOKEN_SECRET = "token_secret";
const store = new userStore();

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
		const user: User = {
			username: req.body.username,
			password_digest: req.body.password,
		};
		const newUser = await store.create(user);
		var token = jwt.sign({ user: newUser }, TOKEN_SECRET);
		res.json(token);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};
// DELETE FUNCTION for USERS TABLE
const destroy = async (req: Request, res: Response) => {
	const deleted = await store.delete(req.body.id);
	res.json(deleted);
};

const update = async (req: Request, res: Response) => {
	const updated = await store.update(
		req.body.id,
		req.body.username,
		req.body.password
	);
	res.json(updated);
};

// CRUD ROUTES for USERS TABLE
const userRoutes = (app: express.Application) => {
	app.get("/users", index);
	app.get("/users/:id", show);
	app.post("/users", verifyAuthToken, create);
	app.delete("/users", verifyAuthToken, destroy);
	app.put("/users/:id", verifyAuthToken, update);
};

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
	try {
		const authorizationHeader = req.headers.authorization;
		const token = authorizationHeader
			? authorizationHeader.split(" ")[1]
			: "dummytoken";
		const decoded = jwt.verify(token, TOKEN_SECRET);

		next();
	} catch (error) {
		res.status(401);
	}
};

export default userRoutes;
