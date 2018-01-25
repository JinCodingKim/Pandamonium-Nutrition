import axios from "axios";

const GET_USER = "GET_USER";
const GET_USER_BY_USER_ID = "GET_USER_BY_USER_ID";
const UPDATE_USER = "UPDATE_USER";
const UPDATE_GUEST_EMAIL = "UPDATE_GUEST_EMAIL";

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

export function getUserByUserId() {
  return {
    type: GET_USER_BY_USER_ID,
    payload: axios
      .get("/profile")
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export function updateUser(obj) {
  return {
    type: UPDATE_USER,
    payload: axios
      .put("/profile/update", obj)
      .then(res => {
        // console.log(res.data);
        return res.data;
      })
      .catch(console.log)
  };
}

export function updateGuestEmail(email) {
  return {
    type: UPDATE_GUEST_EMAIL,
    payload: axios
      .put("/guest/email", { user_email: email })
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

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
    case `${GET_USER_BY_USER_ID}_PENDING`:
      return Object.assign({}, state, {
        loading: true
      });
    case `${GET_USER_BY_USER_ID}_FULFILLED`:
      return Object.assign({}, state, {
        loading: false,
        user: action.payload[0]
      });
    case `${GET_USER_BY_USER_ID}_REJECTED`:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    case `${UPDATE_USER}_FULFILLED`:
      return Object.assign({}, state, {
        user: action.payload
      });
    case `${UPDATE_GUEST_EMAIL}_FULFILLED`:
      return Object.assign({}, state, {
        user: action.payload
      });
    default:
      return state;
  }
}
