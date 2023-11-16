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
    users.push({username: req.body.username, age: req.body.age})
    res.redirect("/")
})

exports.router = router
exports.users = users