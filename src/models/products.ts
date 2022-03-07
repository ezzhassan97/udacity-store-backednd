import client from "../database";
import { PoolClient } from "pg";
import dotenv from "dotenv";
import { Client, Connection } from "pg";

dotenv.config();

export type productReturnType = {
	id: number;
	product_name: string;
	price: number;
};
export type productCreateType = {
	product_name: string;
	price: number;
};
export class productStore {
	async index(): Promise<productReturnType[]> {
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

	async show(id: number): Promise<productReturnType[]> {
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

	async create(p: productCreateType): Promise<productReturnType[]> {
		try {
			const sql =
				"INSERT INTO products (product_name, price) VALUES($1, $2) RETURNING *";
			// @ts-ignore
			const conn = await client.connect();
			const result = await conn.query(sql, [p.product_name, p.price]);

			const product = result.rows[0];

			conn.release();

			return product;
		} catch (err) {
			throw new Error(
				`Could not add new product ${p.product_name}. Error: ${err}`
			);
		}
	}
}
