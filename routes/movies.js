const express = require("express");
const router = express.Router();
let movies = [
    {
        id: 1,
        title: "The Super Mario Galaxy Movie",
        director: "Aaron Horvath and Michael Jelenic",
        year: 2026,
        rating: 6.4,
        genres: ["Animation", "Adventure", "Comedy", "Family", "Fantasy"],
        available: true
    },
    {
        id: 2,
        title: "Project Hail Mary",
        director: "Phil Lord and Christopher Miller",
        year: 2026,
        rating: 8.3,
        genres: ["Sci-Fi", "Adventure", "Drama"],
        available: true
    },
    {
        id: 3,
        title: "Hoppers",
        director: "Daniel Chong",
        year: 2026,
        rating: 7.7,
        genres: ["Animation", "Sci-Fi", "Comedy", "Adventure", "Family"],
        available: false
    },
    {
        id: 4,
        title: "Scream 7",
        director: "Kevin Williamson",
        year: 2026,
        rating: 5.8,
        genres: ["Horror", "Mystery", "Thriller"],
        available: true
    }
];

// GET all movies
router.get("/", (req, res) => {
    res.json(movies);
});

// GET one movie by id
router.get("/:id", (req, res) => {
    const movie = movies.find(mov => mov.id === parseInt(req.params.id));
    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }

    res.json(movie);
});

// POST create new movie
router.post("/", (req, res) => {
    const { title, director, year, rating, genres, available } = req.body;
    const newMovie = {
        id: movies.length + 1,
        title,
        director,
        year,
        rating,
        genres,
        available
    };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

// PUT update movie
router.put("/:id", (req, res) => {
    const index = movies.findIndex(mov => mov.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: "Movie not found" });
    }

    movies[index] = { ...movies[index], ...req.body };
    res.json(movies[index]);
});

// DELETE movie
router.delete("/:id", (req, res) => {
    const index = movies.findIndex(mov => mov.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: "Movie not found" });
    }

    movies.splice(index, 1);
    res.json({ message: "Movie deleted" });
});

module.exports = { router, movies };