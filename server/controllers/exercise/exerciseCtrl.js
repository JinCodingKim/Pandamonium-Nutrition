const axios = require("axios");
const APIKey = process.env.APIKey;

module.exports = {
  getExercises: (req, res) => {
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
              e.description !== "" &&
              e.description
          )
          .map((x, i) => Object.assign(x, { id: i }));
        res.status(200).json(exercises);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  addExercise: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.user;
    const { axios_id, name, category, description } = req.body;
    db
      .add_exercise([user_id, axios_id, name, category, description])
      .then(exercise => res.status(200).json(exercise))
      .catch(err => {
        res.status(500).json(err);
      });
  },
  updateExercise: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.user;
    const { axios_id, name, category, description } = req.body;
    db
      .update_exercise([user_id, axios_id, name, category, description])
      .then(exercise => res.status(200).json(exercise))
      .catch(err => {
        res.status(500).json(err);
      });
  },
  getUserExercises: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    db
      .get_user_exercises()
      .then(exercises => res.status(200).json(exercises))
      .catch(err => {
        res.status(500).json(err);
      });
  },
  addUserExercise: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.user;
    const { name, category, description } = req.body;
    db
      .add_user_exercise([user_id, name, category, description])
      .then(exercise => res.status(200).json(exercise))
      .catch(err => {
        res.status(500).json(err);
      });
  },
  updateUserExercise: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.user;
    const { exercise_id, name, category, description } = req.body;
    db
      .update_user_exercise([user_id, exercise_id, name, category, description])
      .then(exercise => res.status(200).json(exercise))
      .catch(err => {
        res.status(500).json(err);
      });
  },
  deleteUserExercise: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.user;
    const { exercise_id } = req.params;
    db
      .delete_user_exercise([user_id, exercise_id])
      .then(exercise => res.status(200).json(exercise))
      .catch(err => {
        res.status(500).json(err);
      });
  }
  // addExercises: (req, res, next) => {
  //   let exercise = {
  //     id: exercises.length,
  //     name: req.body.name,
  //     description: req.body.description
  //   };
  //   exercises.push(exercise);
  //   res.json(exercises);
  // },

  // updateExercises: (req, res, next) => {
  //   console.log(req.body);
  //   const { id } = req.params;
  //   const index = exercises.findIndex(exercise => exercise.id == id);

  //   exercises[index] = Object.assign({}, exercises[index], {
  //     description: req.body.description
  //   });
  //   res.json(exercises);
  // },

  // removeExercises: (req, res, next) => {
  //   const { id } = req.params;

  //   console.log(exercises.splice(+id, 1));
  //   res.json(exercises);
  // }
};
