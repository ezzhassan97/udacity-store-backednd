import client from "../database";
import dotenv from "dotenv";
import { Client, Connection } from "pg";

dotenv.config();

const saltRounds = 10;
export type product = {
	id: number;
	name: string;
	price: number;
};
export class productStore {
	async index(): Promise<product[]> {
		try {
			const conn = await client.connect();
			const sql = "SELECT * FROM products";
			const results = await conn.query(sql);
			conn.release();
			return results.rows;
		} catch (err) {
			throw new Error(`Can not get data :${err}`);
		}
	}

	async show(id: string): Promise<product[]> {
		try {
			const sql = "SELECT * FROM products WHERE id=($1)";
			// @ts-ignore
			const conn = await client.connect();

			const result = await conn.query(sql, [id]);

			conn.release();

			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not find product ${id}. Error: ${err}`);
		}
	}

	async create(p: product): Promise<product[]> {
		try {
			const sql =
				"INSERT INTO products (name, price) VALUES($1, $2) RETURNING *";
			// @ts-ignore
			const conn = await client.connect();
			const result = await conn.query(sql, [p.name, p.price]);

			const product = result.rows[0];

			conn.release();

			return product;
		} catch (err) {
			throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
		}
	}
}

// export type product = {
//      id: number;
//      title: string;
//      author: string;
//      totalPages: number;
//      summary: string;
// }
// CRUD methods

// export class userStore {
//   async index(): Promise<user[]> {
//     try {
//       // @ts-ignore
//       const conn = await Client.connect()
//       const sql = 'SELECT * FROM users'

//       const result = await conn.query(sql)

//       conn.release()

//       return result.rows
//     } catch (err) {
//       throw new Error(`Could not get users. Error: ${err}`)
//     }
//   }

//   async show(id: string): Promise<user> {
//     try {
//     const sql = 'SELECT * FROM users WHERE id=($1)'
//     // @ts-ignore
//     const conn = await Client.connect()

//     const result = await conn.query(sql, [id])

//     conn.release()

//     return result.rows[0]
//     } catch (err) {
//         throw new Error(`Could not find user ${id}. Error: ${err}`)
//     }
//   }

//   async create(b: user): Promise<user> {
//       try {
//     const sql = 'INSERT INTO users (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *'
//     // @ts-ignore
//     const conn = await Client.connect()

//     const result = await conn
//         .query(sql, [b.title, b.author, b.totalPages, b.summary])

//     const user = result.rows[0]

//     conn.release()

//     return user
//       } catch (err) {
//           throw new Error(`Could not add new user ${title}. Error: ${err}`)
//       }
//   }

//   async delete(id: string): Promise<user> {
//       try {
//     const sql = 'DELETE FROM users WHERE id=($1)'
//     // @ts-ignore
//     const conn = await Client.connect()

//     const result = await conn.query(sql, [id])

//     const user = result.rows[0]

//     conn.release()

//     return user
//       } catch (err) {
//           throw new Error(`Could not delete user ${id}. Error: ${err}`)
//       }
//   }
// }
