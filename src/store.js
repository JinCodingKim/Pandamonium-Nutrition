import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
//local
import user from "./ducks/user";
import product from "./ducks/product";

export default createStore(
  combineReducers({ user, product }),
  applyMiddleware(promiseMiddleware())
);
