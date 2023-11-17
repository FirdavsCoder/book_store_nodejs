const DataSource = require("../lib/dataSource")
const path = require("path")
const StatisticsClass = require("../lib/statisticsClass")
const UserBookClass = require("../lib/userBook")
const idGenerate = require("../lib/idGenerator")
const ResponseData = require("../lib/responseData")


const userBookDatabasePath = path.join(__dirname, "../database/userBooks.json")
const userBooksData = new DataSource(userBookDatabasePath)

const usersDatabasePath = path.join(__dirname, "../database/users.json")
const usersData = new DataSource(usersDatabasePath)

const booksDatabasePath = path.join(__dirname, "../database/books.json")
const bookData = new DataSource(booksDatabasePath)

const statisticsDatabasePath = path.join(__dirname, "../database/statistics.json")
const statisticsData = new DataSource(statisticsDatabasePath)

//@route                GET /user-book
//@desc                 Get User-Book
//@access               Public
const getAllUserBooks = async (req, res) => {
    const userBooks = userBooksData.read()
    res.status(200).json(userBooks)
}

//@route                GET /user-book/:id
//@desc                 Get User-Book By Id
//@access               Public
const getUserBookById = async (req, res) => {
    const userBooks = userBooksData.read()
    const userBookId = Number(req.params.id)

    const foundUserBook = userBooks.find(userBook => userBook.id === userBookId)
    if (foundUserBook) {
        res.status(200).json(new ResponseData("UserBooks found!", foundUserBook, null))
    } else {
        res.status(200).json(new ResponseData("UserBook Not Found!", null, null))
    }
}

//@route                POST /user-book
//@desc                 POST Create User Book
//@access               Public
const createUserBook = async (req, res) => {
    const userBooks = userBooksData.read()
    const body = req.body

    // Validation section
    if (!body.userId || !body.bookId) {
        return res.status(400).json(new ResponseData("userId and bookId must be required NUMBER", null, null))
    }

    // Check user is exists
    const users = usersData.read()
    const foundUser = users.find(user => user.id === Number(req.body.userId))
    if (!foundUser) {
        return res.status(404).json(new ResponseData("User Not Found!", null, null))
    }



    // Check book is exists
    const books = bookData.read()
    const foundBookIndex = books.findIndex(book => book.id === Number(req.body.bookId))
    if (foundBookIndex === -1) {
        return res.status(404).json(new ResponseData("Book Not Found!", null, null))
    }


    // Check UserId
    const foundUserBookByUserId = userBooks.find(userBook => userBook.user_id === Number(req.body.userId))
    if (foundUserBookByUserId) {
        return res.status(400).json(new ResponseData("This user has a book!", null, null))
    }



    // Check Book Count
    const [foundBook] = books.splice(foundBookIndex, 1)
    if (foundBook.count === 0) {
        return res.status(400).json(new ResponseData("This book is no longer available!", null, null))
    } else if (foundBook.count !== 0) {
        foundBook.count = foundBook.count -1
    }


    // Write Book
    books.push(foundBook)
    bookData.write(books)


    // Statistics section
    const statistics = statisticsData.read()
    const newStatisticsId = idGenerate(statistics)
    const todayDate = new Date()
    const newStatistics = new StatisticsClass(
        newStatisticsId,
        Number(req.body.userId),
        Number(req.body.bookId),
        "take",
        null,
        todayDate
    )

    statistics.push(newStatistics)
    statisticsData.write(statistics)



    // UserBook section
    const newUserBookId = idGenerate(userBooks)

    const currentDate = new Date()
    const futureDate = new Date()
    futureDate.setDate(currentDate.getDate() + Number(foundBook.duration))

    const newUserBook = new UserBookClass(
        newUserBookId,
        Number(req.body.userId),
        Number(req.body.bookId),
        currentDate,
        futureDate
    )
    userBooks.push(newUserBook)
    userBooksData.write(userBooks)

    res.status(201).json(new ResponseData("UserBook created successfully!", newUserBook, null))
}

//@route                DELETE /user-book
//@desc                 DELETE User Book
//@access               Public
const deleteUserBook = async (req, res) => {
    const userBooks = userBooksData.read()

    // Check book is exists
    const books = bookData.read()

    const userBookId = Number(req.params.id)
    const foundUserBookIndex = userBooks.findIndex(userBook => userBook.id === userBookId)
    if (foundUserBookIndex === -1) {
        return res.status(400).json(new ResponseData("UserBook Not Found!", null, null))
    }

    const [deletedUserBook] = userBooks.splice(foundUserBookIndex, 1);


    const bookId = deletedUserBook.book_id
    const foundBookIndex1 = books.findIndex(book => book.id === bookId)
    const [foundBook2] = books.splice(foundBookIndex1, 1)
    foundBook2.count = foundBook2.count + 1
    books.push(foundBook2)
    bookData.write(books)

    const notes = []
    const dateString = deletedUserBook.end_date;
    const dateObject = new Date(dateString);
    const today = new Date();
    if (dateObject.toDateString() === today.toDateString() || dateObject.toISOString().split('T')[0] > today.toISOString().split('T')[0]) {
        notes.push("good")
    } else if (dateObject.toISOString().split('T')[0] < today.toISOString().split('T')[0]) {
        notes.push("good")
        notes.push("late")
    }

    const statistics = statisticsData.read()
    const newStatisticsId = idGenerate(statistics)
    const todayDate = new Date()
    const newStatistics = new StatisticsClass(
        newStatisticsId,
        deletedUserBook.user_id,
        deletedUserBook.book_id,
        "give",
        notes,
        todayDate
    )

    statistics.push(newStatistics)
    statisticsData.write(statistics)

    userBooksData.write(userBooks);
    return res.status(200).json(new ResponseData("User deleted successfully!", deletedUserBook, null));

}

module.exports = {
    getAllUserBooks,
    getUserBookById,
    createUserBook,
    deleteUserBook
}