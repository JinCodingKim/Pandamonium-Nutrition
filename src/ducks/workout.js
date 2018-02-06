import axios from "axios";

const GET_EXERCISES = "GET_EXERCISES";
const ADD_EXERCISE = "ADD_EXERCISE";
const UPDATE_EXERCISE = "UPDATE_EXERCISE";
const GET_USER_EXERCISES = "GET_USER_EXERCISES";
const ADD_USER_EXERCISE = "ADD_USER_EXERCISE";
const EDIT_USER_EXERCISE = "EDIT_USER_EXERCISE";
const DELETE_USER_EXERCISE = "DELETE_USER_EXERCISE";

const initialState = {
  exercises: [],
  userExercises: [],
  loading: false,
  error: false
};

export function getExercises() {
  return {
    type: GET_EXERCISES,
    payload: axios
      .get("/api/exercises")
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export function addExercise(id, name, category, description) {
  return {
    type: ADD_EXERCISE,
    payload: axios
      .post("/api/exercise/add", {
        axios_id: id,
        name: name,
        category: category,
        description: description
      })
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export function updateExercise(id, name, category, description) {
  return {
    type: UPDATE_EXERCISE,
    payload: axios
      .put("/api/exercise/update", {
        axios_id: id,
        name: name,
        category: category,
        description: description
      })
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export function getUserExercises(user) {
  return {
    type: GET_USER_EXERCISES,
    payload: axios
      .get(`/api/favorites/${user}`)
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export function addUserExercise(name, category, description) {
  return {
    type: ADD_USER_EXERCISE,
    payload: axios
      .post("/api/favorites/add", {
        name: name,
        category: category,
        description: description
      })
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export function editUserExercise(exercise_id, name, description) {
  return {
    type: EDIT_USER_EXERCISE,
    payload: axios
      .put("/api/favorites/update", {
        exercise_id: exercise_id,
        name: name,
        description: description
      })
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export function deleteUserExercise(exercise_id) {
  return {
    type: DELETE_USER_EXERCISE,
    payload: axios
      .delete(`/api/favorites/${exercise_id}`)
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export default function product(state = initialState, action) {
  switch (action.type) {
    case `${GET_EXERCISES}_PENDING`:
      return Object.assign({}, state, {
        loading: true
      });
    case `${GET_EXERCISES}_FULFILLED`:
      return Object.assign({}, state, {
        loading: false,
        exercises: action.payload
      });
    case `${GET_EXERCISES}_REJECTED`:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    case `${ADD_EXERCISE}_PENDING`:
      return Object.assign({}, state, {
        loading: true
      });
    case `${ADD_EXERCISE}_FULFILLED`:
      return Object.assign({}, state, {
        loading: false,
        userExercises: action.payload
      });
    case `${ADD_EXERCISE}_REJECTED`:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    case `${UPDATE_EXERCISE}_PENDING`:
      return Object.assign({}, state, {
        loading: true
      });
    case `${UPDATE_EXERCISE}_FULFILLED`:
      return Object.assign({}, state, {
        loading: false,
        userExercises: action.payload
      });
    case `${UPDATE_EXERCISE}_REJECTED`:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    case `${GET_USER_EXERCISES}_PENDING`:
      return Object.assign({}, state, {
        loading: true
      });
    case `${GET_USER_EXERCISES}_FULFILLED`:
      return Object.assign({}, state, {
        loading: false,
        userExercises: action.payload
      });
    case `${GET_USER_EXERCISES}_REJECTED`:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    case `${ADD_USER_EXERCISE}_PENDING`:
      return Object.assign({}, state, {
        loading: true
      });
    case `${ADD_USER_EXERCISE}_FULFILLED`:
      return Object.assign({}, state, {
        loading: false,
        userExercises: action.payload
      });
    case `${ADD_USER_EXERCISE}_REJECTED`:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    case `${EDIT_USER_EXERCISE}_PENDING`:
      return Object.assign({}, state, {
        loading: true
      });
    case `${EDIT_USER_EXERCISE}_FULFILLED`:
      return Object.assign({}, state, {
        loading: false,
        userExercises: action.payload
      });
    case `${EDIT_USER_EXERCISE}_REJECTED`:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    case `${DELETE_USER_EXERCISE}_PENDING`:
      return Object.assign({}, state, {
        loading: true
      });
    case `${DELETE_USER_EXERCISE}_FULFILLED`:
      return Object.assign({}, state, {
        loading: false,
        userExercises: action.payload
      });
    case `${DELETE_USER_EXERCISE}_REJECTED`:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    default:
      return state;
  }
}
