import client from "../src/database";

export type user {
    username: string;
    age: number;
}
export class userStore{
    async index(): Promise < user[] > {
        try {
            const conn = await client.connect();
        const sql = 'SELECT * FROM users';
        const results = await conn.query(sql);
        conn.release()
        return results.rows
        }
        catch (err) {
            throw new Error(`Can not get data :${err} `)
        }

    }
}

// export type Book = {
//      id: number;
//      title: string;
//      author: string;
//      totalPages: number;
//      summary: string;
// }
// CRUD methods

// In the video we didn't build out all the CRUD model methods, but here you were tasked with building out all of them. Here is a copy of the entire model file:

// // @ts-ignore
// import Client from '../database'

// export type Book = {
//      id: number;
//      title: string;
//      author: string;
//      totalPages: number;
//      summary: string;
// }

// export class BookStore {
//   async index(): Promise<Book[]> {
//     try {
//       // @ts-ignore
//       const conn = await Client.connect()
//       const sql = 'SELECT * FROM books'

//       const result = await conn.query(sql)

//       conn.release()

//       return result.rows
//     } catch (err) {
//       throw new Error(`Could not get books. Error: ${err}`)
//     }
//   }

//   async show(id: string): Promise<Book> {
//     try {
//     const sql = 'SELECT * FROM books WHERE id=($1)'
//     // @ts-ignore
//     const conn = await Client.connect()

//     const result = await conn.query(sql, [id])

//     conn.release()

//     return result.rows[0]
//     } catch (err) {
//         throw new Error(`Could not find book ${id}. Error: ${err}`)
//     }
//   }

//   async create(b: Book): Promise<Book> {
//       try {
//     const sql = 'INSERT INTO books (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *'
//     // @ts-ignore
//     const conn = await Client.connect()

//     const result = await conn
//         .query(sql, [b.title, b.author, b.totalPages, b.summary])

//     const book = result.rows[0]

//     conn.release()

//     return book
//       } catch (err) {
//           throw new Error(`Could not add new book ${title}. Error: ${err}`)
//       }
//   }

//   async delete(id: string): Promise<Book> {
//       try {
//     const sql = 'DELETE FROM books WHERE id=($1)'
//     // @ts-ignore
//     const conn = await Client.connect()

//     const result = await conn.query(sql, [id])

//     const book = result.rows[0]

//     conn.release()

//     return book
//       } catch (err) {
//           throw new Error(`Could not delete book ${id}. Error: ${err}`)
//       }
//   }
// }