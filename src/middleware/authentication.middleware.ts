import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Error from "../interfaces/error.interface";
import config from "./config";

const handleError = (next: NextFunction) => {
	const err: Error = new Error("Login failed");
	next(err);
};

const authenticateMiddleware = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	try {
		const authHead = req.get("Authorization");
		console.log(authHead);
		if (authHead) {
			const token = authHead.split(" ")[1];
			const bearer = authHead.split(" ")[0].toLowerCase();
			if (token && bearer === "bearer") {
				const verify = jwt.verify(
					token,
					config.tokenSecret as unknown as string
				);
				if (verify) {
					next();
				} else {
					console.log("Token not verified");
				}
			} else {
				console.log("Auth not bearer type");
			}
		} else {
			console.log("Auth Header does not exist");
		}
	} catch (err) {
		console.log("ERROR");
		next(err);
	}
};

export default authenticateMiddleware;
