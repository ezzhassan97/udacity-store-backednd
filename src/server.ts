import express, { Request, response, Response } from "express";
import errorMiddleware from "./middleware/error.middleware";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import userRoutes from "./handlers/users";
import productRoutes from "./handlers/products";
import orderRoutes from "./handlers/orders";
import config from "./middleware/config";
import db from "./database";
console.log(config);

// Port Address
const port = config.port;
// Create App instance
const app: express.Application = express();

// ===============MiddleWares===================

// Morgan logging MiddleWare
app.use(morgan("short"));

// Helmet middleware
app.use(helmet());
// JSON PARSING
app.use(express.json());
// ERROR Middleware

// CORS
const corsOptions = {
	origin: "http://someotherdomain.com",
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// ___________BASE ROUTE______________
app.get("/", function (req: Request, res: Response) {
	res.send("Hello World!");
});

export const server = app.listen(port, function () {
	console.log(`starting app on:${port}`);
});

// _____TESTING DATABASE__________

db.connect().then((client) => {
	return client
		.query("SELECT NOW()")
		.then((res) => {
			client.release();
			console.log(res.rows);
		})
		.catch((err) => {
			client.release();
			console.log(err.stack);
		});
});

productRoutes(app);
orderRoutes(app);
userRoutes(app);

export default app;
