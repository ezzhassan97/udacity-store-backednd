import { StringLiteralLike } from "typescript";
import client from "../database";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Client, Connection } from "pg";

dotenv.config();

const saltRounds = 10;
export type User = {
	id: number;
	firstname: string;
	lastname: string;
	username: string;
	password_digest: string;
};
export class userStore {
	async index(): Promise<User[]> {
		try {
			const conn = await client.connect();
			const sql = "SELECT * FROM users";
			const results = await conn.query(sql);
			conn.release();
			return results.rows;
		} catch (err) {
			throw new Error(`Can not get data :${err}`);
		}
	}

	async show(id: Number): Promise<User[]> {
		try {
			const sql = "SELECT * FROM users WHERE id=($1)";
			// @ts-ignore
			const conn = await client.connect();

			const result = await conn.query(sql, [id]);

			conn.release();

			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not find user ${id}. Error: ${err}`);
		}
	}

	async create(u: User): Promise<User[]> {
		try {
			const sql =
				"INSERT INTO (username,firstname,lastname, password_digest) VALUES($1,$2,$3,$4) RETURNING *";
			// @ts-ignore
			const conn = await client.connect();

			const hash = bcrypt.hashSync(u.password_digest, saltRounds);

			const result = await conn.query(sql, [
				u.username,
				u.firstname,
				u.lastname,
				hash,
			]);

			const user = result.rows[0];

			conn.release();

			return user;
		} catch (err) {
			throw new Error(`Could not add new user ${u.username}. Error: ${err}`);
		}
	}
	async authenticate(username: string, password: string): Promise<User | null> {
		const conn = await client.connect();
		const sql = "SELECT password_digest FROM users WHERE username=($1)";

		const result = await conn.query(sql, [username]);

		console.log(password);

		if (result.rows.length) {
			const user = result.rows[0];

			console.log(user);

			if (bcrypt.compareSync(password, user.password_digest)) {
				return user;
			}
		}

		return null;
	}

	async delete(id: number): Promise<User> {
		try {
			const sql = "DELETE FROM users WHERE id=($1)";
			// @ts-ignore
			const conn = await client.connect();

			const result = await conn.query(sql, [id]);

			const user = result.rows[0];

			conn.release();

			return user;
		} catch (err) {
			throw new Error(`Could not delete user ${id}. Error: ${err}`);
		}
	}
}
