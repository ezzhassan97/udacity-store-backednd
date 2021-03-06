import { User, userStore } from "../models/users";

const store = new userStore();

describe("user Model", () => {
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

	it("create method should add a user", async () => {
		const result = await store.create({
			id: 1,
			firstname: "ezz",
			lastname: "hassan",
			username: "ezzhassan",
			password_digest: "ezz",
		});
		expect(result).toHaveSize(1);

		// 	.toEqual([
		// 	{
		// 		id: 1,
		// 		firstname: "ezz",
		// 		lastname: "hassan",
		// 		username: "ezzhassan",
		// 		password_digest: "ezz",
		// 	},
		// ]);
	});

	it("index method should return a list of users", async () => {
		const result = await store.index();
		expect(result).toEqual([
			{
				id: 1,
				username: "ezzhassan",
				firstname: "ezz",
				lastname: "hassan",
				password_digest: "ezz",
			},
		]);
	});

	it("show method should return the correct user", async () => {
		const result = await store.show(1);
		expect(result).toEqual([
			{
				id: 1,
				firstname: "ezz",
				lastname: "hassan",
				username: "ezzhassan",
				password_digest: "ezz",
			},
		]);
	});
});
