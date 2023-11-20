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
    res.render("books", {title: "Barcha kitoblar", users: books})
}


//@route                GET /books/:id
//@desc                 Get Books
//@access               Public
const getBookById = async (req, res) => {
    const books = bookData.read()
    const bookId = Number(req.params.id)
    const foundBook = books.find((book) => book.id === bookId)
    console.log("Mana shu ishlab ketvotir");
    console.log(foundBook)
    if (foundBook) {
        res.render("detailPage", {title: `${foundBook.title} detail page`, foundBook})
    } else {
        res.render("404")
    }
}


//@route                POST /books
//@desc                 POST Books
//@access               Public
const createBook = async (req, res) => {
    const books = bookData.read()
    const body = req.body
    console.log(body);

    // if (!body.title || !isNaN(body.price) || !isNaN(body.isbn) || !body.description || !body.author || !isNaN(body.page) ){
    //     return res.render("404")
    // }

    // const foundBookByName = books.find((book) => book.name === body.name)
    // if (foundBookByName) {
    //     return res.render("404")
    // }
    const newId = idGenerate(books)
    const newBook = new BookClass(newId, body.title, body.description, body.author, body.price, body.isbn, body.page, body.photo)
    books.push(newBook)
    bookData.write(books)
    res.redirect("/books")
}

//@route                PUT /books/:id
//@desc                 PUT Books
//@access               Public
const updateBook = async (req, res) => {
    const books = bookData.read()
    const bookId = Number(req.params.id)
    const body = req.body

    const foundBookIndex = books.findIndex((book) => book.id === bookId)

    const [foundBook] = books.splice(foundBookIndex, 1)
    console.log(foundBook);
    
    foundBook.title = body.title
    foundBook.description = body.description
    foundBook.author = body.author
    foundBook.price = body.price
    foundBook.isbn = body.isbn
    foundBook.page = body.page
    foundBook.photo = body.photo
    
    books.push(foundBook);
    bookData.write(books)
    res.redirect("/books")
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
    return res.redirect("/books")
}


const getUpdatePage = async (req, res) => {
    const books = bookData.read()
    const bookId = Number(req.params.id)
    const body = req.body
    const foundBookIndex = books.findIndex((book) => book.id === bookId)
    const [foundBook] = books.splice(foundBookIndex, 1)

    res.render("book-edit/update", {title: "Update ", foundBook})
}


const addBookPage = (req, res) => {
    res.render('add-book', {title: "Book Add Page"})
}


module.exports = {
    getAllBooks,
    getBookById,
    getUpdatePage,
    createBook,
    updateBook,
    deleteBook,
    addBookPage
}