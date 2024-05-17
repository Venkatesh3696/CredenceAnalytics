const Movie = require("../models/Movie.model");
const {
  uploadImage,
  retriveImage,
} = require("../helpers/cloudinaryImageHelper");

const createMovieController = async (req, res) => {
  try {
    const { name, description } = req.fields;
    const { image } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required!" });
      case !description:
        return res.status(500).send({ error: "description is required!" });
      case !image:
        return res.status(500).send({ error: "image is required!" });
    }
    const imagePublicId = await uploadImage(image.path);

    const movie = await Movie.create({ name, description, imagePublicId });

    await movie.save();
    res.status(201).send({
      message: "Movie created successfully!",
      movie,
    });
  } catch (error) {
    res.json({ error });
  }
};

const getAllMoviesController = async (req, res) => {
  try {
    const movies = await Movie.find();

    res.status(200).send({
      message: "movies fetched successfully!",
      movies,
    });
  } catch (error) {
    res.json({ message: error });
  }
};

const getSingleMoviesController = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);

    res.status(200).send({
      message: "movie fetched successfully!",
      movie,
    });
  } catch (error) {
    res.json({ message: error });
  }
};

const updateMovieController = async (req, res) => {
  try {
    const movie = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).send({
      message: "movie fetched successfully!",
      movie,
    });
  } catch (error) {
    res.json({ message: error });
  }
};

const deleteMovieController = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByIdAndDelete(id);

    res.status(200).send({
      message: "movie deleted successfully!",
      movie,
    });
  } catch (error) {
    res.json({ message: error });
  }
};

const getImageUrl = (req, res) => {
  const { publicId } = req.params;
  try {
    result = retriveImage(publicId);
    res.status(200).send({
      message: "image fetched successfully!",
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createMovieController,
  getAllMoviesController,
  getSingleMoviesController,
  updateMovieController,
  deleteMovieController,
  getImageUrl,
};
