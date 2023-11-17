const { log } = require("console")
const express = require("express")
const router = express.Router()
const path = require("path")

const users = []

router.get("/bosh", (req, res) => {
    res.render("main")
})

router.get("/add-users", (req, res) => {
    res.render("add-users")
})



router.post("/", (req, res) => {
    log(req.body)
    users.push({title: req.body.title, description: req.body.description, author: req.body.author, price: req.body.price, isbn: req.body.isbn, page: req.body.page, photo: req.body.photo})
    res.redirect("/")
})

exports.router = router
exports.users = users