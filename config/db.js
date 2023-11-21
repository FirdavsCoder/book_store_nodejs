const Pool = require("pg").Pool
const pool = new Pool({
    user: "postgres",
    password: "firdavs2007",
    database: "book_store",
    host: "localhost",
    port: 5432
})


module.exports = pool