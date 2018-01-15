import axios from "axios";

const GET_PRODUCTS = "GET_PRODUCTS";

const initialState = {
  product: [],
  loading: false,
  error: false
};

export function getProducts() {
  return {
    type: GET_PRODUCTS,
    payload: axios
      .get("/products")
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .catch(console.log)
  };
}

export default function product(state = initialState, action) {
  switch (action.type) {
    case `${GET_PRODUCTS}_PENDING`:
      return Object.assign({}, state, {
        loading: true
      });
    case `${GET_PRODUCTS}_FULFILLED`:
      return Object.assign({}, state, {
        loading: false,
        product: action.payload
      });
    case `${GET_PRODUCTS}_REJECTED`:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    default:
      return state;
  }
}
