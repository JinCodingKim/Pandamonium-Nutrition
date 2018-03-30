import React from "react";
//React-Router-Dom
import { Switch, Route } from "react-router-dom";
//Local
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import ProfileManager from "./components/Profile/ProfileManager/ProfileManager";
import ExerciseManager from "./components/Profile/ExerciseManager/ExerciseManager";
import Cart from "./components/Cart/Cart";
import CheckoutInfo from "./components/CheckoutInfo/CheckoutInfo";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import Terms from "./components/Terms/Terms";
import Policy from "./components/Policy/Policy";
import Disclaimer from "./components/Disclaimer/Disclaimer";
import Shop from "./components/Shop/Shop";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import WorkoutList from "./components/WorkoutList/WorkoutList";
import CreateWorkout from "./components/CreateWorkout/CreateWorkout";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/profile" component={Profile} />
    <Route path="/profile/manager" component={ProfileManager} />
    <Route path="/exercise/manager" component={ExerciseManager} />
    <Route path="/cart" component={Cart} />
    <Route path="/checkout" component={CheckoutInfo} />
    <Route path="/contact" component={Contact} />
    <Route path="/about" component={About} />
    <Route path="/terms-conditions" component={Terms} />
    <Route path="/privacy-policy" component={Policy} />
    <Route path="/disclaimer" component={Disclaimer} />
    <Route path="/shop" component={Shop} />
    <Route path="/product/:product_type" component={ProductDetail} />
    <Route path="/exercises" component={WorkoutList} />
    <Route path="/create" component={CreateWorkout} />
  </Switch>
);
