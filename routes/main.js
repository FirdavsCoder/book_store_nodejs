const express = require("express")
const router = express.Router()
const path = require("path")

const {users} = require("./users")
const { log } = require("console")

router.get("/", (req, res) => {
    console.log(users);
    res.render("news.pug", {title: "Hamma kitoblar", users})
})

router.get("/subpage", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/subpage.html"))
})

module.exports = router