import { Pool } from "pg";
import config from "../middleware/config";

const pool = new Pool({
	host: config.host,
	port: parseInt(config.dbPort as string, 10),
	database: config.database,
	user: config.user,
	password: config.password,
});

pool.on("error", (error: Error) => {
	console.error(error.message);
});

export default pool;

// import dotenv from "dotenv";

// import { Pool, PoolClient, Client } from "pg";

// dotenv.config();
// const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_NAME_TEST, DB_PORT, ENV } =
// 	process.env;
// let client: any;
// console.log(ENV);

// if (ENV === "test") {
// 	client = new Client({
// 		host: DB_HOST,
// 		port: parseInt(DB_PORT as string),
// 		database: DB_NAME_TEST,
// 		user: DB_USER,
// 		password: DB_PASSWORD,
// 	});
// }

// if (ENV === "dev") {
// 	client = new Client({
// 		host: DB_HOST,
// 		port: parseInt(DB_PORT as string),
// 		database: DB_NAME,
// 		user: DB_USER,
// 		password: DB_PASSWORD,
// 	});
// }

// export default client;
