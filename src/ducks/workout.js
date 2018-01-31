import axios from "axios";

const GET_EXERCISES = "GET_EXERCISES";

const initialState = {
  exercises: [],
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
    default:
      return state;
  }
}
