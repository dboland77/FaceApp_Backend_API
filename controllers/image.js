// IMAGE ROUTE
// This is for increasing the user entries number when they use the application.
// Gets the id from the body and again uses Knex syntax for incrementing entries.

const Clarifai = require("clarifai");
const dotenv = require("dotenv");

dotenv.config();

// API KEY
const app = new Clarifai.App({
  apiKey: process.env.API_CLARIFAI,
});

// Clarifai's face detection magic
const handleApiCall = (req, res) => {
  const { URL } = req.body;
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, URL)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("badLink"));
};

const handleImage = (req, res, pool) => {
  const { id } = req.body;
  pool
    .connect()
    .then((client) => {
      return client
        .query(
          "update users set entries = entries + 1 WHERE id = $1 RETURNING entries",
          [id]
        )
        .then((pgresponse) => {
          client.release();
          res.json(pgresponse.rows[0].entries);
        })
        .catch((err) => {
          client.release();
          res.status(400).json("Unable to find this user");
        });
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImage,
  handleApiCall,
};
