import { pool } from '../../db-sql.js'

export class ShortUrlModel {
    static async buscarShortUrl ({ url }) {
        const { rows } = await pool.query('SELECT * FROM urls WHERE original_url = $1', [url])
        return rows[0]
    }

    static async createShortUrl ({ url }) {
        await pool.query('INSERT INTO urls (original_url) VALUES ($1)', [url])
        const { rows } = await pool.query('SELECT * FROM urls WHERE original_url = $1', [url])
        return rows[0]
        
    }

    static async obtenerShortUrl ({ index }) {
        const { rows } = await pool.query('SELECT * FROM urls WHERE short_url = $1', [index])
        console.log(rows)
        return rows[0]
    }
}