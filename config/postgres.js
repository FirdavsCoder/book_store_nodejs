const pool = require("./db")




const getBooks = async () => {
    const sql = "SELECT * FROM books ORDER BY id ASC"
    const books = (await pool.query(sql)).rows
    return books
}


const getById = async (id) => {
    const sql = `SELECT * FROM books WHERE id=${id}`
    const [foundBook] = (await pool.query(sql)).rows
    return foundBook
}

module.exports = {
    getBooks,
    getById
}