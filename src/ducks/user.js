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
    payload: axios
      .get("/api/me")
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export function getUserByUserId() {
  return {
    type: GET_USER_BY_USER_ID,
    payload: axios
      .get("/api/profile")
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
      .put("/api/profile/update", obj)
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export function updateGuestEmail(email) {
  return {
    type: UPDATE_GUEST_EMAIL,
    payload: axios
      .put("/api/guest/email", { user_email: email })
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export function updateShippingAddress(
  shipFirst,
  shipLast,
  shipAdd,
  shipCity,
  shipState,
  shipCountry,
  shipZip
) {
  return {
    type: UPDATE_SHIPPING_ADDRESS,
    payload: axios
      .put("/api/profile/shipping", {
        shipping_first_name: shipFirst,
        shipping_last_name: shipLast,
        shipping_address: shipAdd,
        shipping_city: shipCity,
        shipping_state: shipState,
        shipping_country: shipCountry,
        shipping_zip: shipZip
      })
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export function updateBillingAddress(
  billFirst,
  billLast,
  billAdd,
  billCity,
  billState,
  billCountry,
  billZip
) {
  return {
    type: UPDATE_BILLING_ADDRESS,
    payload: axios
      .put("/api/profile/billing", {
        billing_first_name: billFirst,
        billing_last_name: billLast,
        billing_address: billAdd,
        billing_city: billCity,
        billing_state: billState,
        billing_country: billCountry,
        billing_zip: billZip
      })
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
