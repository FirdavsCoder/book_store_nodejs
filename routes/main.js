const express = require("express")
const router = express.Router()
const path = require("path")

const users = require("./users")

router.get("/", (req, res) => {
    console.log(users.users);
    res.sendFile(path.join(__dirname, "../views/main.html"))
})

router.get("/subpage", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/subpage.html"))
})

module.exports = router