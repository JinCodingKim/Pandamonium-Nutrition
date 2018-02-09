import axios from "axios";

const UPDATE_TOTAL_AMNT = "UPDATE_TOTAL_AMNT";
const GET_PRODUCTS = "GET_PRODUCTS";
const GET_PRODUCT_BY_TYPE = "GET_PRODUCT_BY_TYPE";
const GET_REVIEWS = "GET_REVIEWS";
const ADD_REVIEW = "ADD_REVIEW";
const ADD_TO_CART = "ADD_TO_CART";
const GET_CART = "GET_CART";
const UPDATE_CART = "UPDATE_CART";
const UPDATE_CART_ITEM = "UPDATE_CART_ITEM";
const REMOVE_CART = "REMOVE_CART";
const REMOVE_ALL_CART = "REMOVE_ALL_CART";
const GET_SORTED_PRODUCTS = "GET_SORTED_PRODUCTS";

const initialState = {
  product: [],
  productDetail: [],
  cart: [],
  review: [],
  loading: false,
  error: false,
  totalAmnt: 0
};

export function updateTotalAmnt(amount) {
  return {
    type: UPDATE_TOTAL_AMNT,
    payload: amount
  };
}

export function getProducts() {
  return {
    type: GET_PRODUCTS,
    payload: axios
      .get("/api/products")
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export function getProductByType(type) {
  return {
    type: GET_PRODUCT_BY_TYPE,
    payload: axios
      .get(`/api/product/${type}`)
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export function getReviews(product) {
  return {
    type: GET_REVIEWS,
    payload: axios
      .get(`/api/review/${product}`)
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export function addReview(product, name, email, rating, title, description) {
  return {
    type: ADD_REVIEW,
    payload: axios
      .post("/api/product/review", {
        product_id: product,
        review_name: name,
        review_email: email,
        rating: rating,
        review_title: title,
        description: description
      })
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export function getSortedProducts(sorted) {
  return {
    type: GET_SORTED_PRODUCTS,
    payload: axios
      .get(`/api/products/${sorted}`)
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export function addToCart(product, amount, price, single) {
  return {
    type: ADD_TO_CART,
    payload: axios
      .post("/api/cart/add", {
        product_id: product,
        quantity: amount,
        total_price: price,
        single_price: single
      })
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export function updateCart(product, amount, price) {
  return {
    type: UPDATE_CART,
    payload: axios
      .put("/api/cart/update", {
        product_id: product,
        quantity: amount,
        total_price: price
      })
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export function updateCartItem(product, amount, price) {
  return {
    type: UPDATE_CART_ITEM,
    payload: axios
      .put("/api/cart/quantity", {
        product_id: product,
        quantity: amount,
        total_price: price
      })
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export function getCart(user) {
  return {
    type: GET_CART,
    payload: axios
      .get(`/api/cart/${user}`)
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export function removeCart(product) {
  return {
    type: REMOVE_CART,
    payload: axios
      .delete(`/api/cart/${product}`)
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export function removeAllCart(user) {
  return {
    type: REMOVE_ALL_CART,
    payload: axios
      .delete(`/api/checkout/${user}`)
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export default function product(state = initialState, action) {
  switch (action.type) {
    case `UPDATE_TOTAL_AMNT`:
      return Object.assign({}, state, {
        totalAmnt: action.payload
      });
    case `${GET_REVIEWS}_PENDING`:
      return Object.assign({}, state, {
        loading: true
      });
    case `${GET_REVIEWS}_FULFILLED`:
      return Object.assign({}, state, {
        loading: false,
        review: action.payload
      });
    case `${GET_REVIEWS}_REJECTED`:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
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
    case `${GET_SORTED_PRODUCTS}_PENDING`:
      return Object.assign({}, state, {
        loading: true
      });
    case `${GET_SORTED_PRODUCTS}_FULFILLED`:
      return Object.assign({}, state, {
        loading: false,
        product: action.payload
      });
    case `${GET_SORTED_PRODUCTS}_REJECTED`:
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
    case `${REMOVE_CART}_PENDING`:
      return Object.assign({}, state, {
        loading: true
      });
    case `${REMOVE_CART}_FULFILLED`:
      return Object.assign({}, state, {
        loading: false,
        cart: action.payload
      });
    case `${REMOVE_CART}_REJECTED`:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    case `${ADD_TO_CART}_PENDING`:
      return Object.assign({}, state, {
        loading: true
      });
    case `${ADD_TO_CART}_FULFILLED`:
      return Object.assign({}, state, {
        loading: false,
        cart: action.payload
      });
    case `${ADD_TO_CART}_REJECTED`:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    case `${UPDATE_CART}_PENDING`:
      return Object.assign({}, state, {
        loading: true
      });
    case `${UPDATE_CART}_FULFILLED`:
      return Object.assign({}, state, {
        loading: false,
        cart: action.payload
      });
    case `${UPDATE_CART}_REJECTED`:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    default:
      return state;
  }
}
