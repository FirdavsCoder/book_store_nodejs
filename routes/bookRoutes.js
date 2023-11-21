const express = require("express")
const router = express.Router()

const {
    getAllBooks, getBookById, createBook, deleteBook, updateBook, getUpdatePage, addBookPage
} = require("../controllers/bookController")


router.get("/add", addBookPage)
router.post("/add", createBook)
router.get("/book/update/:id", getUpdatePage)
router.put("/update", updateBook)
router.get("/", getAllBooks)
router.get("/book/:id", getBookById)
router.post('/:id/edit', updateBook)
router.post('/:id/delete', deleteBook)
// router.post("/", createBook)
// router.delete("/:id", deleteBook)
// router.put("/:id", updateBook)

module.exports = router;