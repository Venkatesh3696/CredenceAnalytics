const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  secure: true,
});

const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
};

const uploadImage = async (imagePath) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    // console.log(result);

    return result.public_id;
  } catch (error) {
    console.error("helper error", error);
  }
};

const retriveImage = async (publicId) => {
  try {
    const response = await cloudinary.url(publicId, options);

    console.log("image result", response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { uploadImage, retriveImage };
