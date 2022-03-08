import supertest from "supertest";
import app from "../../server";
import userModel from "../../models/user.model";

import User from "../../types/user.type";
import db from "../../database/database";

const request = supertest(app);
let token = "";

const userM = new userModel();

describe("Testing Logic", () => {
	const user = {
		username: "testname",
		firstname: "firsttest",
		lastname: "lasttest",
		password: "testpassword",
	} as User;

	beforeAll(async () => {
		const createdUser = await userM.create(user);
		user.id = createdUser.id;
	});

	afterAll(async () => {
		const conn = await db.connect();
		const sql = "DELETE FROM users;";
		await conn.query(sql);
		conn.release();
	});

	it("User Authenticate Method Function Test", async () => {
		const authUser = await userM.authenticateUser(
			user.username,
			user.password as string
		);
		expect(authUser?.username).toBe(user.username);
		expect(authUser?.firstname).toBe(user.firstname);
		expect(authUser?.lastname).toBe(user.lastname);
	});

	it("User Create Method Function Test", async () => {
		const createdUser = await userM.create({
			username: "testname2",
			firstname: "firsttest2",
			lastname: "lasttest2",
			password: "testpassword",
		} as User);

		expect(createdUser).toEqual({
			id: createdUser.id,
			username: "testname2",
			firstname: "firsttest2",
			lastname: "lasttest2",
		} as User);
	});

	it("User Index Method Function Test", async () => {
		const allUsers = await userM.index();
		expect(allUsers.length).toBeGreaterThan(1);
	});

	it("User Show Method Function Test", async () => {
		const oneUser = await userM.show(user.id as unknown as number);
		expect(oneUser?.username).toBe(user.username);
		expect(oneUser?.firstname).toBe(user.firstname);
		expect(oneUser?.lastname).toBe(user.lastname);
	});
});
