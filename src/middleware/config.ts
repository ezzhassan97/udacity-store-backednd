import dotenv from "dotenv";
dotenv.config();
// console.log(process.env);

const {
	PORT,
	ENV,
	DB_NAME,
	DB_HOST,
	DB_NAME_TEST,
	DB_PORT,
	DB_USER,
	DB_PASSWORD,
	BCRYPT_PASSWORD,
	SALT_ROUNDS,
	TOKEN_SECRET,
} = process.env;
export default {
	port: PORT,
	env: ENV,
	database: ENV === "dev" ? DB_NAME : DB_NAME_TEST,
	host: DB_HOST,
	dbPort: DB_PORT,
	user: DB_USER,
	password: DB_PASSWORD,
	pepper: BCRYPT_PASSWORD,
	saltRounds: SALT_ROUNDS,
	tokenSecret: TOKEN_SECRET,
};
