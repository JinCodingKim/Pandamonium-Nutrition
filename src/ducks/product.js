import axios from "axios";

const GET_PRODUCTS = "GET_PRODUCTS";
const GET_PRODUCT_BY_TYPE = "GET_PRODUCT_BY_TYPE";
const ADD_TO_CART = "ADD_TO_CART";
const GET_CART = "GET_CART";
const UPDATE_CART = "UPDATE_CART";

const initialState = {
  product: [],
  productDetail: [],
  cart: [],
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

export function getProductByType(type) {
  return {
    type: GET_PRODUCT_BY_TYPE,
    payload: axios
      .get(`/product/${type}`)
      .then(res => {
        // console.log(res.data);
        return res.data;
      })
      .catch(console.log)
  };
}

export function addToCart(product, amount) {
  console.log("ADD");
  return {
    type: ADD_TO_CART,
    payload: axios
      .post("/cart/add", { product_id: product, quantity: amount })
      .then(res => {
        // console.log("Add Cart:" + res.data);
        return res.data;
      })
      .catch(console.log)
  };
}

export function updateCart(product, amount) {
  console.log("UPDATE");
  return {
    type: UPDATE_CART,
    payload: axios
      .put("/cart/update", { product_id: product, quantity: amount })
      .then(res => {
        // console.log("Update Cart:" + res.data);
        return res.data;
      })
      .catch(console.log)
  };
}

export function getCart(user) {
  return {
    type: GET_CART,
    payload: axios
      .get(`/cart/${user}`)
      .then(res => {
        // console.log("Get Cart:" + res.data);
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
    case `${GET_PRODUCT_BY_TYPE}_PENDING`:
      return Object.assign({}, state, {
        loading: true
      });
    case `${GET_PRODUCT_BY_TYPE}_FULFILLED`:
      return Object.assign({}, state, {
        loading: false,
        productDetail: action.payload
      });
    case `${GET_PRODUCT_BY_TYPE}_REJECTED`:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    case `${GET_CART}_PENDING`:
      return Object.assign({}, state, {
        loading: true
      });
    case `${GET_CART}_FULFILLED`:
      return Object.assign({}, state, {
        loading: false,
        cart: action.payload
      });
    case `${GET_CART}_REJECTED`:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    default:
      return state;
  }
}
