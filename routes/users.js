const { log } = require("console")
const express = require("express")
const router = express.Router()
const path = require("path")

const users = []


const {
    getAllBooks, getBookById, createBook, deleteBook, updateBook
} = require("../controllers/bookController")




const addNewPosterPage = (req, res) => {
    res.render('add-users')
  }

router.get("/add-users", addNewPosterPage)



router.post("/", createBook)
router.get("/:id", getBookById)

exports.router = router
exports.users = users