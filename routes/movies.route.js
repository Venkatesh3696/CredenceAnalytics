const router = require("express").Router();
const formidableMiddleware = require("express-formidable");

const {
  getAllMoviesController,
  createMovieController,
  getSingleMoviesController,
  deleteMovieController,
  updateMovieController,
} = require("../controllers/movies.controller");

router.post("/", formidableMiddleware(), createMovieController);

router.get("/", getAllMoviesController);

router.get("/:id", getSingleMoviesController);

router.put("/:id", updateMovieController);

router.delete("/:id", deleteMovieController);

module.exports = router;
