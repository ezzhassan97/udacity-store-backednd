import client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Client, Connection } from "pg";

dotenv.config();

const saltRounds = 10;
export type order = {
	id: number;
	user_id: number;
};
export class orderStore {
	async index(): Promise<order[]> {
		try {
			const conn = await client.connect();
			const sql = "SELECT * FROM orders";
			const results = await conn.query(sql);
			conn.release();
			return results.rows;
		} catch (err) {
			throw new Error(`Can not get data :${err}`);
		}
	}

	async show(id: string): Promise<order[]> {
		try {
			const sql = "SELECT * FROM orders WHERE id=($1)";
			// @ts-ignore
			const conn = await client.connect();

			const result = await conn.query(sql, [id]);

			conn.release();

			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not find order ${id}. Error: ${err}`);
		}
	}

	async create(o: order): Promise<order[]> {
		try {
			const sql = "INSERT INTO (user_id ) VALUES($1) RETURNING *";
			// @ts-ignore
			const conn = await client.connect();
			const result = await conn.query(sql, [o.user_id]);

			const order = result.rows[0];

			conn.release();

			return order;
		} catch (err) {
			throw new Error(`Could not add new order ${o.user_id}. Error: ${err}`);
		}
	}

	async delete(id: number): Promise<order> {
		try {
			const sql = "DELETE FROM orders WHERE id=($1)";
			// @ts-ignore
			const conn = await client.connect();

			const result = await conn.query(sql, [id]);

			const order = result.rows[0];

			conn.release();

			return order;
		} catch (err) {
			throw new Error(`Could not delete order ${id}. Error: ${err}`);
		}
	}

	async addProduct(
		quantity: number,
		orderId: string,
		productId: string
	): Promise<order> {
		// get order to see if it is open
		try {
			const sql = "SELECT * FROM orders WHERE id=($1)";
			//@ts-ignore
			const conn = await Client.connect();

			const result = await conn.query(sql, [orderId]);

			const order = result.rows[0];

			if (order.status !== "open") {
				throw new Error(
					`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
				);
			}

			conn.release();
		} catch (err) {
			throw new Error(`${err}`);
		}

		try {
			const sql =
				"INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
			//@ts-ignore
			const conn = await Client.connect();

			const result = await conn.query(sql, [quantity, orderId, productId]);

			const order = result.rows[0];

			conn.release();

			return order;
		} catch (err) {
			throw new Error(
				`Could not add product ${productId} to order ${orderId}: ${err}`
			);
		}
	}
}
