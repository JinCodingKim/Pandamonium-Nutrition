import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
//local
import user from "./ducks/user";
import product from "./ducks/product";
import workout from "./ducks/workout";

export default createStore(
  combineReducers({ user, product, workout }),
  applyMiddleware(promiseMiddleware())
);
