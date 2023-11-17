class UserBook {
    constructor(id, userId, bookId, startDate, endDate) {
        this.id = id
        this.user_id = userId
        this.book_id = bookId
        this.start_date = startDate
        this.end_date = endDate
    }
}

module.exports = UserBook