import { Request, Response, NextFunction } from "express";
import Error from "../interfaces/error.interface";
const errorMiddleware = (
	error: Error,
	res: Response,
	_req: Request,
	next: NextFunction
) => {
	const status = error.status || 500;
	const message = error.message || "Something is wrong with the server 🔺";
	res.status(status).json({ status, message });
	next();
};

export default errorMiddleware;
