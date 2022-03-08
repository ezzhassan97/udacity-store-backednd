import db from "../database/database";
import User from "../types/user.type";
import bcrypt from "bcrypt";
import config from "../middleware/config";

const hashPassword = (password: string) => {
	const pepper = config.pepper;
	const saltRounds = parseInt(config.saltRounds as string, 10);
	return bcrypt.hashSync(`${password}${pepper}`, saltRounds);
};

class userModel {
	// Create user function

	async create(u: User): Promise<User> {
		try {
			const conn = await db.connect();
			const sql =
				"INSERT INTO users (username,firstname,lastname, password) VALUES($1,$2,$3,$4) RETURNING *";
			const result = await conn.query(sql, [
				u.username,
				u.firstname,
				u.lastname,
				hashPassword(u.password),
			]);

			const user = result.rows[0];
			conn.release();
			return user;
		} catch (err) {
			throw new Error(`Could not add new user ${u.username}. Error: ${err}`);
		}
	}

	// Index user function
	async index(): Promise<User[]> {
		try {
			const conn = await db.connect();
			const sql = "SELECT * from users";
			const result = await conn.query(sql);

			const users = result.rows;
			conn.release();
			return users;
		} catch (err) {
			throw new Error(`Could not show all users. Error: ${err}`);
		}
	}
	// Show user function

	async show(id: number): Promise<User> {
		try {
			const conn = await db.connect();
			const sql = "SELECT * from users where id=($1)";
			const result = await conn.query(sql, [id]);

			const user = result.rows[0];
			conn.release();
			return user;
		} catch (err) {
			throw new Error(`Could not show all users. Error: ${err}`);
		}
	}
}

export default userModel;
