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
    payload: axios.get("/api/exercises")
  };
}

export function addExercise(axios_id, name, category, description) {
  return {
    type: ADD_EXERCISE,
    payload: axios.post("/api/exercise/add", {
      axios_id,
      name,
      category,
      description
    })
  };
}

export function updateExercise(axios_id, name, category, description) {
  return {
    type: UPDATE_EXERCISE,
    payload: axios.put("/api/exercise/update", {
      axios_id,
      name,
      category,
      description
    })
  };
}

export function getUserExercises() {
  return {
    type: GET_USER_EXERCISES,
    payload: axios.get(`/api/favorites`)
  };
}

export function addUserExercise(name, category, description) {
  return {
    type: ADD_USER_EXERCISE,
    payload: axios.post("/api/favorites/add", {
      name,
      category,
      description
    })
  };
}

export function editUserExercise(exercise_id, name, description) {
  return {
    type: EDIT_USER_EXERCISE,
    payload: axios.put("/api/favorites/update", {
      exercise_id,
      name,
      description
    })
  };
}

export function deleteUserExercise(exercise_id) {
  return {
    type: DELETE_USER_EXERCISE,
    payload: axios.delete(`/api/favorites/${exercise_id}`)
  };
}

export default function product(state = initialState, action) {
  switch (action.type) {
    case `${GET_EXERCISES}_PENDING`:
    case `${ADD_EXERCISE}_PENDING`:
    case `${UPDATE_EXERCISE}_PENDING`:
    case `${GET_USER_EXERCISES}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_EXERCISES}_FULFILLED`:
      return {
        ...state,
        loading: false,
        exercises: action.payload.data
      };
    case `${GET_EXERCISES}_REJECTED`:
    case `${ADD_EXERCISE}_REJECTED`:
    case `${UPDATE_EXERCISE}_REJECTED`:
    case `${GET_USER_EXERCISES}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case `${ADD_EXERCISE}_FULFILLED`:
    case `${GET_USER_EXERCISES}_FULFILLED`:
    case `${UPDATE_EXERCISE}_FULFILLED`:
      return {
        ...state,
        loading: false,
        userExercises: action.payload.data
      };
    default:
      return state;
  }
}
