const { log } = require("console")
const express = require("express")
const router = express.Router()
const path = require("path")

const users = []


const {
    getAllBooks, getBookById, createBook, deleteBook, updateBook
} = require("../controllers/bookController")


router.get("/all", getAllBooks)
router.get("/:id", getBookById)


router.get("/bosh", (req, res) => {
    res.render("main")
})

router.get("/add-users", (req, res) => {
    res.render("add-users")
})



router.post("/", createBook)

exports.router = router
exports.users = users