const express = require("express")
const userRoutes = require("./routes/users")
const mainRoutes = require("./routes/main")
const path = require("path")

// Create app using EXPRESS
const app = express()


app.use("view engine", "pug")
app.use("views", "views")


// Body parsers
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))


// Routers
app.use("/users", userRoutes.router)
app.use(mainRoutes)






// Middleware, 404 Page Not Found
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "./views/404.html"))
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