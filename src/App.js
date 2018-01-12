import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import ProfileManager from "./components/Profile/UserInfo/ProfileManager/ProfileManager";
import Cart from "./components/Cart/Cart";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import Shop from "./components/Shop/Shop";
import Footer from "./components/Footer/Footer";

import logo from "./logo.svg";
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
          {/* <Route path="/cart" component={Cart} /> */}
          {/* <Route path="/contact" component={Contact} /> */}
          {/* <Route path="/about" component={About} /> */}
          {/* <Route path="/cart" component={Shop} /> */}
        </Switch>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
