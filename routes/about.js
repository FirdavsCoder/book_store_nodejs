const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.render("book/about", {title: "About Page"})
})

module.exports = router