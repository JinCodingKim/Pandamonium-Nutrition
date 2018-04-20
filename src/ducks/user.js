import axios from "axios";

const GET_USER = "GET_USER";
const GET_USER_BY_USER_ID = "GET_USER_BY_USER_ID";
const UPDATE_USER = "UPDATE_USER";
const UPDATE_GUEST_EMAIL = "UPDATE_GUEST_EMAIL";
const UPDATE_SHIPPING_ADDRESS = "UPDATE_SHIPPING_ADDRESS";
const UPDATE_BILLING_ADDRESS = "UPDATE_BILLING_ADDRESS";

const initialState = {
  user: {},
  loading: false,
  error: false
};

export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/api/me")
  };
}
export function getUserByUserId() {
  return {
    type: GET_USER_BY_USER_ID,
    payload: axios.get("/api/profile")
  };
}
export function updateUser(obj) {
  return {
    type: UPDATE_USER,
    payload: axios.put("/api/profile/update", obj)
  };
}
export function updateGuestEmail(user_email) {
  return {
    type: UPDATE_GUEST_EMAIL,
    payload: axios.put("/api/guest/email", { user_email })
  };
}

export function updateShippingAddress(
  shipping_first_name,
  shipping_last_name,
  shipping_address,
  shipping_city,
  shipping_state,
  shipping_country,
  shipping_zip
) {
  return {
    type: UPDATE_SHIPPING_ADDRESS,
    payload: axios.put("/api/profile/shipping", {
      shipping_first_name,
      shipping_last_name,
      shipping_address,
      shipping_city,
      shipping_state,
      shipping_country,
      shipping_zip
    })
  };
}

export function updateBillingAddress(
  billing_first_name,
  billing_last_name,
  billing_address,
  billing_city,
  billing_state,
  billing_country,
  billing_zip
) {
  return {
    type: UPDATE_BILLING_ADDRESS,
    payload: axios.put("/api/profile/billing", {
      billing_first_name,
      billing_last_name,
      billing_address,
      billing_city,
      billing_state,
      billing_country,
      billing_zip
    })
  };
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_PENDING`:
    case `${GET_USER_BY_USER_ID}_PENDING`:
    case `${UPDATE_USER}_PENDING`:
    case `${UPDATE_GUEST_EMAIL}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_USER}_FULFILLED`:
    case `${GET_USER_BY_USER_ID}_FULFILLED`:
    case `${UPDATE_USER}_FULFILLED`:
    case `${UPDATE_GUEST_EMAIL}_FULFILLED`:
      return {
        ...state,
        loading: false,
        user: action.payload.data
      };
    case `${GET_USER}_REJECTED`:
    case `${GET_USER_BY_USER_ID}_REJECTED`:
    case `${UPDATE_USER}_REJECTED`:
    case `${UPDATE_GUEST_EMAIL}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
