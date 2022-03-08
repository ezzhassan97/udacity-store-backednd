import express, { NextFunction, Request, Response } from "express";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../middleware/config";

const user = new userModel();

// Hello function for testing this user controller & Route

export const hello = async (_req: Request, res: Response) => {
	try {
		res.send("HELLO WORLD 🌎");
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

// CREATE NEW USER FUNCTION for USERS TABLE
export const create = async (req: Request, res: Response) => {
	try {
		const newUser = await user.create(req.body);

		res.json(newUser);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

export const index = async (_req: Request, res: Response) => {
	try {
		const allUsers = await user.index();
		res.json(allUsers);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

export const show = async (req: Request, res: Response) => {
	try {
		const oneUser = await user.show(req.params.id as unknown as number);
		res.json(oneUser);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

//_________ AUTHENTICATION FOR USERS _______________
// //
// export const verifyAuthToken = (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) => {
// 	try {
// 		const authorizationHeader = req.headers.authorization;
// 		const token = authorizationHeader
// 			? authorizationHeader.split(" ")[1]
// 			: "dummytoken";
// 		const decoded = jwt.verify(token, TOKEN_SECRET);
// 		return decoded;
// 		next();
// 	} catch (error) {
// 		res.status(401);
// 	}
// };