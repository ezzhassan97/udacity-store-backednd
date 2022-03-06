import dotenv from "dotenv";
import { Pool, PoolClient } from "pg";

dotenv.config();
const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_NAME_TEST, DB_PORT, ENV } =
	process.env;
let client: any;
console.log(ENV);

if (ENV === "test") {
	client = new Pool({
		host: DB_HOST,
		port: parseInt(DB_PORT as string),
		database: DB_NAME_TEST,
		user: DB_USER,
		password: DB_PASSWORD,
	});
}

if (ENV === "dev") {
	client = new Pool({
		host: DB_HOST,
		port: parseInt(DB_PORT as string),
		database: DB_NAME,
		user: DB_USER,
		password: DB_PASSWORD,
	});
}

export default client;
