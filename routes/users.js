const express = require("express")
const router = express.Router()
const path = require("path")

const users = []

router.get("/add-users", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/add-users.html"))
})



router.post("/", (req, res) => {
    users.push({username: req.body.username, age: req.body.age})
    res.redirect("/")
})

exports.router = router
exports.users = users