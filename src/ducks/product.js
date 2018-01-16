import axios from "axios";

const GET_PRODUCTS = "GET_PRODUCTS";
const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";

const initialState = {
  product: [],
  productDetail: [],
  loading: false,
  error: false
};

export function getProducts() {
  return {
    type: GET_PRODUCTS,
    payload: axios
      .get("/products")
      .then(res => {
        // console.log(res.data);
        return res.data;
      })
      .catch(console.log)
  };
}

export function getProductById(id) {
  return {
    type: GET_PRODUCT_BY_ID,
    payload: axios
      .get(`/product/${id}`)
      .then(res => {
        // console.log(res.data);
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
    case `${GET_PRODUCT_BY_ID}_PENDING`:
      return Object.assign({}, state, {
        loading: true
      });
    case `${GET_PRODUCT_BY_ID}_FULFILLED`:
      return Object.assign({}, state, {
        loading: false,
        productDetail: action.payload[0]
      });
    case `${GET_PRODUCT_BY_ID}_REJECTED`:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    default:
      return state;
  }
}
