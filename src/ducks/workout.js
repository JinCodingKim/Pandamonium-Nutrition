import axios from "axios";

const GET_EXERCISES = "GET_EXERCISES";
const ADD_EXERCISE = "ADD_EXERCISE";
const UPDATE_EXERCISE = "UPDATE_EXERCISE";
const GET_USER_EXERCISES = "GET_USER_EXERCISES";

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
    default:
      return state;
  }
}
