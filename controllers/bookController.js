const DataSource = require("../lib/dataSource")
const path = require("path")
const BookClass = require("../lib/bookClass")
const idGenerate = require("../lib/idGenerator")
const ResponseData = require("../lib/responseData")

const booksDatabasePath = path.join(__dirname, "../database/books.json")
const bookData = new DataSource(booksDatabasePath)


//@route                GET /books
//@desc                 Get Books
//@access               Public
const getAllBooks = async (req, res) => {
    const books = bookData.read()
    res.status(200).json(books)
}


//@route                GET /books/:id
//@desc                 Get Books
//@access               Public
const getBookById = async (req, res) => {
    const books = bookData.read()
    const bookId = Number(req.params.id)
    const foundBook = books.find((book) => book.id === bookId)

    console.log(foundBook)
    if (foundBook) {
        res.status(200).json(new ResponseData("Book found!", foundBook, null))
    } else {
        res.status(404).json(new ResponseData("Book Not Found!", null, null))
    }
}


//@route                POST /books
//@desc                 POST Books
//@access               Public
const createBook = async (req, res) => {
    const books = bookData.read()
    const body = req.body

    if (!body.name || !isNaN(body.count) || !isNaN(body.duration)){
        return res.status(400).json(new ResponseData("name, count and duration" +
            " must be required or count and duration must be Number!", null, null))
    }

    const foundBookByName = books.find((book) => book.name === body.name)
    if (foundBookByName) {
        return res.status(
            400
        ).json(
            new ResponseData(
                "This name already exist",
                null,
                null
            )
        )
    }
    const newId = idGenerate(books)
    const newBook = new BookClass(newId, body.name, body.count, body.duration)
    books.push(newBook)
    bookData.write(books)
    res.status(201).json(new ResponseData("Book created successfully!", newBook, null))
}

//@route                PUT /books/:id
//@desc                 PUT Books
//@access               Public
const updateBook = async (req, res) => {
    const books = bookData.read()
    const bookId = Number(req.params.id)
    const body = req.body

    if (!body.name || isNaN(body.count) || isNaN(body.duration)){
        return res.status(400).json(new ResponseData("name, count and duration" +
            " must be required or count and duration must be Number!", null, null))
    }

    const foundBookIndex = books.findIndex((book) => book.id === bookId)
    const foundBookByName = books.find(book => book.name === body.name)

    if (foundBookIndex === -1) {
        return res.status(404).json(new ResponseData("Book Not Found!", null, null))
    }
    const [foundBook] = books.splice(foundBookIndex, 1)
    if (foundBookByName && foundBook.name !== body.name) {
        return res.status(400).json(new ResponseData("This name already exist", null, null))
    }
    foundBook.name = body.name
    foundBook.count = body.count
    foundBook.duration = body.duration

    books.push(foundBook);
    bookData.write(books)
    return res.status(200).json(new ResponseData("Book successfully updated!", foundBook, null))
}

//@route                DELETE /books/:id
//@desc                 DELETE Books
//@access               Public
const deleteBook = async (req, res) => {
    const books = bookData.read()
    const foundBookIndex = books.findIndex(book => book.id === Number(req.params.id))

    if (foundBookIndex === -1) {
        return res.status(404).json(new ResponseData("Book Not Found!", null, null))
    }

    const [deletedBook] = books.splice(foundBookIndex, 1)
    bookData.write(books)
    return res.status(200).json(new ResponseData("Book deleted successfully!", null, null))
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}