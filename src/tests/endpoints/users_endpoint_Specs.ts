import supertest from "supertest";
import { userStore } from "../../models/users";
import { User } from "../../models/users";
import app from "../../server";

const request = supertest(app);

describe("Test endpoint responses", () => {
	it("gets all users api endpoint", async (done) => {
		const res = await request.get("/users");

		expect(res.status).toBe(200);
		expect(res.body).toEqual([
			{
				id: 1,
				username: "ezzhassan",
				firstname: "ezz",
				lastname: "hassan",
				password_digest: "ezz",
			},
		]);
		done();
	});
	it("gets user by id api endpoint", async (done) => {
		const res = await request.get("/users/1");

		expect(res.status).toBe(200);
		expect(res.body).toEqual({
			id: 1,
			username: "ezzhassan",
			firstname: "ezz",
			lastname: "hassan",
			password_digest: "ezz",
		});
		done();
	});
	it("create user api endpoint", async (done) => {
		const res = await request.post("/users");

		expect(res.status).toBe(200);

		done();
	});
});
