const orderRoutes = (app: express.Application) => {
	app.get("/orders", index);
	app.get("/orders/:id", show);
	app.post("/orders", create);
	// add product
	app.post("/orders/:id/products", addProduct);
};

// ... other methods
const addProduct = async (_req: Request, res: Response) => {
	const orderId: string = _req.params.id;
	const productId: string = _req.body.productId;
	const quantity: number = parseInt(_req.body.quantity);

	try {
		const addedProduct = await store.addProduct(quantity, orderId, productId);
		res.json(addedProduct);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};
