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
  error: "",
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
    payload: axios.get("/api/products")
  };
}

export function getProductByType(type) {
  return {
    type: GET_PRODUCT_BY_TYPE,
    payload: axios.get(`/api/product/${type}`)
  };
}

export function getReviews(product) {
  return {
    type: GET_REVIEWS,
    payload: axios.get(`/api/review/${product}`)
  };
}

export function addReview(
  product_id,
  review_name,
  review_email,
  rating,
  review_title,
  description
) {
  return {
    type: ADD_REVIEW,
    payload: axios.post("/api/product/review", {
      product_id,
      review_name,
      review_email,
      rating,
      review_title,
      description
    })
  };
}

export function getSortedProducts(sorted) {
  return {
    type: GET_SORTED_PRODUCTS,
    payload: axios.get(`/api/products/${sorted}`)
  };
}

export function addToCart(product_id, quantity, total_price, single_price) {
  return {
    type: ADD_TO_CART,
    payload: axios.post("/api/cart/add", {
      product_id,
      quantity,
      total_price,
      single_price
    })
  };
}

export function updateCart(product_id, quantity, total_price) {
  return {
    type: UPDATE_CART,
    payload: axios.put("/api/cart/update", {
      product_id,
      quantity,
      total_price
    })
  };
}

export function updateCartItem(product_id, quantity, total_price) {
  return {
    type: UPDATE_CART_ITEM,
    payload: axios.put("/api/cart/quantity", {
      product_id,
      quantity,
      total_price
    })
  };
}

export function getCart(user) {
  return {
    type: GET_CART,
    payload: axios.get(`/api/cart/${user}`)
  };
}

export function removeCart(product) {
  return {
    type: REMOVE_CART,
    payload: axios.delete(`/api/cart/${product}`)
  };
}

export function removeAllCart(user) {
  return {
    type: REMOVE_ALL_CART,
    payload: axios.delete(`/api/checkout/${user}`)
  };
}

export default function product(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TOTAL_AMNT:
      return {
        ...state,
        totalAmnt: action.payload
      };
    case `${GET_REVIEWS}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_REVIEWS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        review: action.payload.data
      };
    case `${GET_REVIEWS}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case `${GET_PRODUCTS}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_PRODUCTS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        product: action.payload.data
      };
    case `${GET_PRODUCTS}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case `${GET_SORTED_PRODUCTS}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_SORTED_PRODUCTS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        product: action.payload.data
      };
    case `${GET_SORTED_PRODUCTS}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case `${GET_PRODUCT_BY_TYPE}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_PRODUCT_BY_TYPE}_FULFILLED`:
      return {
        ...state,
        loading: false,
        productDetail: action.payload.data
      };
    case `${GET_PRODUCT_BY_TYPE}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case `${GET_CART}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_CART}_FULFILLED`:
      return {
        ...state,
        loading: false,
        cart: action.payload.data
      };
    case `${GET_CART}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case `${REMOVE_CART}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${REMOVE_CART}_FULFILLED`:
      return {
        ...state,
        loading: false,
        cart: action.payload.data
      };
    case `${REMOVE_CART}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case `${ADD_TO_CART}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${ADD_TO_CART}_FULFILLED`:
      return {
        ...state,
        loading: false,
        cart: action.payload.data
      };
    case `${ADD_TO_CART}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case `${UPDATE_CART}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${UPDATE_CART}_FULFILLED`:
      return {
        ...state,
        loading: false,
        cart: action.payload.data
      };
    case `${UPDATE_CART}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
