class StatisticsClass{
    constructor(id, userId, bookId, status, note, createdAt) {
        this.id = id
        this.user_id = userId
        this.book_id = bookId
        this.status = status
        this.note = note
        this.created_at = createdAt
    }
}

module.exports = StatisticsClass