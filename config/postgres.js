const pool = require("./db")




const getBooks = async () => {
    const sql = "SELECT * FROM books ORDER BY id ASC"
    const books = (await pool.query(sql)).rows
    return books
}


const getById = async (id) => {
    const sql = `SELECT * FROM books WHERE id=$1`
    const [foundBook] = (await pool.query(sql, [id])).rows
    return foundBook
}

const updateBookById = async (id, title, description, author, price, isbn, page, photo) => {
    const sql = `UPDATE books SET title=$1, description=$2, author=$3, price=$4, isbn=$5, page=$6, photo=$7 WHERE id=$8`
    await pool.query(sql, [title, description, author, price, isbn, page, photo, id])
    return
}

const insertBook = async (title, description, author, price, isbn, page, photo) => {
    const sql = `INSERT INTO books(title, description, author, price, isbn, page, photo) 
    VALUES($1, $2, $3, $4, $5, $6, $7)` 
    await pool.query(sql, [title, description, author, price, isbn, page, photo])
    return
}

const deleteBookById = async (id) => {
    const sql = `DELETE FROM books WHERE id=$1`
    await pool.query(sql, [id])
    return
}

module.exports = {
    getBooks,
    getById,
    updateBookById, 
    insertBook,
    deleteBookById
}