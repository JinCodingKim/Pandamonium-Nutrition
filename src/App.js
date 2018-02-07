import React, { Component } from "react";
//React-Router
import { Route, Switch } from "react-router-dom";
//Local
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import ProfileManager from "./components/Profile/ProfileManager/ProfileManager";
import ExerciseManager from "./components/Profile/ExerciseManager/ExerciseManager";
import Cart from "./components/Cart/Cart";
import CheckoutInfo from "./components/CheckoutInfo/CheckoutInfo";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import Shop from "./components/Shop/Shop";
import Footer from "./components/Footer/Footer";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import WorkoutList from "./components/WorkoutList/WorkoutList";
import CreateWorkout from "./components/CreateWorkout/CreateWorkout";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/profile/manager" component={ProfileManager} />
          <Route path="/exercise/manager" component={ExerciseManager} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={CheckoutInfo} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
          {/* <Route path="/terms" component={Terms} /> */}
          {/* <Route path="/policy" component={Policy} /> */}
          {/* <Route path="/disclaimer" component={Disclaimer}/> */}
          <Route path="/shop" component={Shop} />
          <Route path="/product/:product_type" component={ProductDetail} />
          <Route path="/exercises" component={WorkoutList} />
          <Route path="/create" component={CreateWorkout} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
