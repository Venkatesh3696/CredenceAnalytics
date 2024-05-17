const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected to db ${conn.connection.host}`);
  } catch (error) {
    console.log("error in connection db", error);
  }
};

module.exports = connectDB;
