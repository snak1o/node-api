const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const { router, movies } = require("./routes/movies");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Handlebars setup
app.engine("handlebars", exphbs.engine({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// API routes
app.use("/api/movies", router);

// Webpage route
app.get("/", (req, res) => {
    res.render("index", { movies });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});