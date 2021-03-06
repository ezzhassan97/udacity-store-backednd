import { order, orderStore } from "../models/orders";

const store = new orderStore();

describe("order Model", () => {
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

	it("create method should add a order", async () => {
		const result = await store.create({
			id: 1,
			user_id: 1,
		});
		expect(result).toHaveSize(1);
	});

	it("index method should return a list of orders", async () => {
		const result = await store.index();
		expect(result).toEqual([
			{
				id: 1,
				user_id: 1,
			},
		]);
	});

	it("show method should return the correct order", async () => {
		const result = await store.show("1");
		expect(result).toEqual([
			{
				id: 1,
				user_id: 1,
			},
		]);
	});
});
