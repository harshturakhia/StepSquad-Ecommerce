const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log(`Database Connected with server`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
