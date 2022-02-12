import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userStore_routes from "./handlers/users";

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

userStore_routes(app);

// app.get('/articles', (_req: Request, res: Response) => {
//     try {
//         res.send('this is the INDEX route')
//     } catch (err) {
//         res.status(400)
//         res.json(err)
//     }
// })

// app.get('/articles/:id', (_req: Request, res: Response) => {
//     try {
//        res.send('this is the SHOW route')
//     } catch (err) {
//        res.status(400)
//        res.json(err)
//     }
// })

// app.post('/articles', (req: Request, res: Response) => {
//     const article: Article = {
//       title: req.body.title,
//       content: req.body.content
//     }
//     try {
//        res.send('this is the CREATE route')
//     } catch (err) {
//        res.status(400)
//        res.json(err)
//     }
// })

// app.put('/articles/:id', (req: Request, res: Response) => {
//     const article: Article = {
//       id: req.params.id,
//       title: req.body.title,
//       content: req.body.content
//     }
//     try {
//        res.send('this is the EDIT route')
//     } catch (err) {
//        res.status(400)
//        res.json(err)
//     }
// })

// app.delete('/articles/:id', (_req: Request, res: Response) => {
//     try {
//        res.send('this is the DELETE route')
//     } catch (err) {
//        res.status(400)
//        res.json(err)
//     }
// }
