import supertest from "supertest";
import { orderStore } from "../../models/orders";
import { order } from "../../models/orders";
import app from "../../server";

const request = supertest(app);

describe("Test endpoint responses", () => {
	it("gets all orders api endpoint", async (done) => {
		const res = await request.get("/orders");

		expect(res.status).toBe(200);
		expect(res.body).toEqual([
			{
				id: 1,
				user_id: 1,
			},
		]);
		done();
	});
	it("gets order by id api endpoint", async (done) => {
		const res = await request.get("/orders/1");

		expect(res.status).toBe(200);
		expect(res.body).toEqual({
			id: 1,
			user_id: 1,
		});
		done();
	});
	it("create order api endpoint", async (done) => {
		const res = await request.post("/orders");

		expect(res.status).toBe(200);

		done();
	});
	it("delets a order api endpoint", async (done) => {
		const res = await request.delete("/orders/1");
		expect(res.status).toBe(200);
		expect(res.body).toEqual({
			id: 1,
			user_id: 1,
		});
		done();
	});
});
