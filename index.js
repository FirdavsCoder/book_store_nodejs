const express = require("express")
const userRoutes = require("./routes/users")
const mainRoutes = require("./routes/main")
const path = require("path")

// Create app using EXPRESS
const app = express()


app.set("view engine", "pug")
app.set("views", "views")


// Body parsers
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))


// Routers
app.use("/users", userRoutes.router)
app.use("/", mainRoutes)






// Middleware, 404 Page Not Found
app.use((req, res, next) => {
    res.render("404")
})

// Import PORT variable from .env
const PORT = process.env.PORT || 4000

// Server Listener
app.listen(
    PORT,
    () => {
        console.log(`Server is running on port ${PORT}`);
    }
)