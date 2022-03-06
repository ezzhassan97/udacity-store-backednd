import { product, productStore } from "../models/products";

const store = new productStore();

describe("product Model", () => {
	it("should have an index method", () => {
		expect(store.index).toBeDefined();
	});

	it("should have a show method", () => {
		expect(store.index).toBeDefined();
	});

	it("should have a create method", () => {
		expect(store.index).toBeDefined();
	});

	it("should have a update method", () => {
		expect(store.index).toBeDefined();
	});

	it("should have a delete method", () => {
		expect(store.index).toBeDefined();
	});

	it("create method should add a product", async () => {
		const result = await store.create({
			id: 1,
			product_name: "product",
			price: 100,
		});
		expect(result).toEqual([
			{
				id: 1,
				product_name: "product",
				price: 100,
			},
		]);
	});

	it("index method should return a list of products", async () => {
		const result = await store.index();
		expect(result).toEqual([
			{
				id: 1,
				product_name: "product",
				price: 100,
			},
		]);
	});

	it("show method should return the correct product", async () => {
		const result = await store.show("1");
		expect(result).toEqual([
			{
				id: 1,
				product_name: "product",
				price: 100,
			},
		]);
	});
});
