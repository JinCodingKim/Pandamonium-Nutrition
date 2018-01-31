const axios = require("axios");
const APIKey = process.env.APIKey;
let exercises = [];

const getExercises = (req, res, next) => {
  if (!exercises.length) {
    axios
      .get(
        "https://wger.de/api/v2/exercise/?language=2&limit=470&status=2&context=edit"
      )
      .then(response => {
        exercises = response.data.results
          .filter(
            e =>
              e.license_author == "wger.de" &&
              e.description !== "<p>.</p>" &&
              e.description !== ""
          )
          .map((x, i) => Object.assign(x, { id: i }));
        res.json(exercises);
      });
  } else {
    res.json(exercises);
  }
};

const addExercises = (req, res, next) => {
  let exercise = {
    id: exercises.length,
    name: req.body.name,
    description: req.body.description
  };
  exercises.push(exercise);
  res.json(exercises);
};

const updateExercises = (req, res, next) => {
  console.log(req.body);
  const { id } = req.params;
  const index = exercises.findIndex(exercise => exercise.id == id);

  exercises[index] = Object.assign({}, exercises[index], {
    description: req.body.description
  });
  res.json(exercises);
};

const removeExercises = (req, res, next) => {
  const { id } = req.params;

  console.log(exercises.splice(+id, 1));
  res.json(exercises);
};

module.exports = {
  getExercises,
  addExercises,
  updateExercises,
  removeExercises
};
