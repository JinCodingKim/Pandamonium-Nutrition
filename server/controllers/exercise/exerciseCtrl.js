const axios = require("axios");
const APIKey = process.env.APIKey;
let list = [];

module.exports = {
  getExercises: (req, res) => {
    if (!list.length) {
      axios
        .get(
          "https://wger.de/api/v2/exercise/?language=2&limit=470&status=2&context=edit"
        )
        .then(response => {
          list = response.data.results
            .filter(
              e =>
                e.license_author == "wger.de" &&
                e.description !== "<p>.</p>" &&
                e.description !== "" &&
                e.description
            )
            .map((x, i) => Object.assign(x, { id: i }));
          res.status(200).json(list);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    } else {
      res.status(200).json(list);
    }
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
    const { user_id } = req.user;
    db
      .get_user_exercises([user_id])
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
    const { exercise_id, name, description } = req.body;
    db
      .update_user_exercise([user_id, exercise_id, name, description])
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
};
