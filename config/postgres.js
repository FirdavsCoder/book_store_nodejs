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
    console.log(id, title, description, author, price, isbn, page, photo)
    const sql = `UPDATE books SET title=${title}, description=${description}, author=${author}, price=${price}, isbn=${isbn}, page=${page}, photo=${photo} WHERE id=${id}`
    await pool.query(sql)
    return
}

module.exports = {
    getBooks,
    getById,
    updateBookById
}