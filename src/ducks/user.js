import axios from "axios";

const GET_USER = "GET_USER";
const UPDATE_USER = "UPDATE_USER";
// const LOG_OUT = "LOG_OUT";

const initialState = {
  user: {},
  loading: false,
  error: false
};

export function getUser() {
  return {
    type: GET_USER,
    payload: axios
      .get("/me")
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .catch(console.log)
  };
}

export function updateUser(obj) {
  return {
    type: UPDATE_USER,
    payload: axios.put("/profile/update", obj).then(res => {
      console.log(res.data);
      return res.data;
    })
  };
}

// export function logOut(history) {
//   return {
//     type: LOG_OUT,
//     payload: axios
//       .get("/logout")
//       .then(res => res.data)
//       .catch(console.log)
//   };
// }

export default function user(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_PENDING`:
      return Object.assign({}, state, {
        loading: true
      });
    case `${GET_USER}_FULFILLED`:
      return Object.assign({}, state, {
        loading: false,
        user: action.payload
      });
    case `${GET_USER}_REJECTED`:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    case `${UPDATE_USER}_FULFILLED`:
      return Object.assign({}, state, {
        user: action.payload
      });
    // case `${LOG_OUT}_FULFILLED`:
    //   return {
    //     user: {}
    //   };
    default:
      return state;
  }
}
