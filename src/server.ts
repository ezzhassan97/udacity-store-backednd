import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./handlers/users";
import productRoutes from "./handlers/products";
import orderRoutes from "./handlers/orders";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());
const corsOptions = {
	origin: "http://someotherdomain.com",
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.get("/", function (req: Request, res: Response) {
	res.send("Hello World!");
});

app.listen(3000, function () {
	console.log(`starting app on: http://localhost:${address}`);
});

productRoutes(app);
orderRoutes(app);
userRoutes(app);
