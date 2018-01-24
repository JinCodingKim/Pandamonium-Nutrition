import axios from "axios";

const GET_PRODUCTS = "GET_PRODUCTS";
const GET_PRODUCT_BY_TYPE = "GET_PRODUCT_BY_TYPE";
const ADD_REVIEW = "ADD_REVIEW";
const ADD_TO_CART = "ADD_TO_CART";
const GET_CART = "GET_CART";
const UPDATE_CART = "UPDATE_CART";
const UPDATE_CART_ITEM = "UPDATE_CART_ITEM";
const REMOVE_CART = "REMOVE_CART";
const REMOVE_ALL_CART = "REMOVE_ALL_CART";
const GET_SORTED_PRODUCTS = "GET_SORTED_PRODUCTS";
const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";

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

export function addReview(product, name, email, rating, title, description) {
  return {
    type: ADD_REVIEW,
    payload: axios
      .post("/product/review", {
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
  // console.log("sorted: " + sorted);
  return {
    type: GET_SORTED_PRODUCTS,
    payload: axios
      .get(`/products/${sorted}`)
      .then(res => {
        // console.log(res.data);
        return res.data;
      })
      .catch(console.log)
  };
}

export function addToCart(product, amount, price, single) {
  // console.log("ADD PRICE:" + price);
  return {
    type: ADD_TO_CART,
    payload: axios
      .post("/cart/add", {
        product_id: product,
        quantity: amount,
        total_price: price,
        single_price: single
      })
      .then(res => {
        // console.log("Add Cart:" + res.data);
        return res.data;
      })
      .catch(console.log)
  };
}

export function updateCart(product, amount, price) {
  // console.log("UPDATE PRICE: " + price);
  return {
    type: UPDATE_CART,
    payload: axios
      .put("/cart/update", {
        product_id: product,
        quantity: amount,
        total_price: price
      })
      .then(res => {
        // console.log("Update Cart:" + res.data);
        return res.data;
      })
      .catch(console.log)
  };
}

export function updateCartItem(product, amount, price) {
  // console.log("product:" + product + " amount:" + amount + " price:" + price);
  return {
    type: UPDATE_CART_ITEM,
    payload: axios
      .put("/cart/quantity", {
        product_id: product,
        quantity: amount,
        total_price: price
      })
      .then(res => {
        // console.log("Update Item: " + res.data);
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

export function removeCart(product) {
  // console.log(product);
  return {
    type: REMOVE_CART,
    payload: axios
      .delete(`/cart/${product}`)
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
      .delete(`checkout/${user}`)
      .then(res => {
        return res.data;
      })
      .catch(console.log)
  };
}

export function searchProducts(search) {
  return {
    type: SEARCH_PRODUCTS,
    payload: search
  };
}

export default function product(state = initialState, action) {
  switch (action.type) {
    case `SEARCH_PRODUCTS`:
      return Object.assign({}, state, {
        product: state.product.filter(e => {
          if (
            e.product_name.toLowerCase().includes(action.payload.toLowerCase())
          ) {
            return true;
          } else if (
            e.product_type.toLowerCase().includes(action.payload.toLowerCase())
          ) {
            return true;
          } else {
            return false;
          }
        })
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
    default:
      return state;
  }
}
