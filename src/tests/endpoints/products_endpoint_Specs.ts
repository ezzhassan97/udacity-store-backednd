import supertest from "supertest";
import { productStore } from "../../models/products";
import { productCreateType } from "../../models/products";
import { productReturnType } from "../../models/products";
import app from "../../server";

const request = supertest(app);

describe("Test endpoint responses", () => {
	it("gets all products api endpoint", async (done) => {
		const res = await request.get("/products");

		expect(res.status).toBe(200);
		expect(res.body).toEqual([
			{
				id: 1,
				product_name: "product",
				price: 100,
			},
		]);
		done();
	});
	it("gets product by id api endpoint", async (done) => {
		const res = await request.get("/products/1");

		expect(res.status).toBe(200);
		expect(res.body).toEqual({
			id: 1,
			product_name: "product",
			price: 100,
		});
		done();
	});
	it("create product api endpoint", async (done) => {
		const res = await request.post("/products");

		expect(res.status).toBe(200);

		done();
	});
});
