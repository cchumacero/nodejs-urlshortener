import pg from 'pg'

export const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "urlspg",
    password: process.env.PSQLPASSWORD,
    port: process.env.PSQLPORT
})