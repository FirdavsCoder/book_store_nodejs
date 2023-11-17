const express = require("express")
const DataSource = require("../lib/dataSource")

const router = express.Router()
const path = require("path")

const {users} = require("./users")


const booksDatabasePath = path.join(__dirname, "../database/books.json")
const bookData = new DataSource(booksDatabasePath)

router.get("/", (req, res) => {
    const books = bookData.read()
    res.render("news.pug", {title: "Hamma kitoblar", users: books})
})

// router.get("/subpage", (req, res) => {
//     res.sendFile(path.join(__dirname, "../views/subpage.html"))
// })

module.exports = router