import React, { Component } from "react";
//React-Router
import { Route, Switch } from "react-router-dom";
//Material-ui
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {
  grey900,
  grey500,
  grey100,
  grey300,
  grey400,
  white,
  darkBlack,
  fullBlack
} from "material-ui/styles/colors";
import { fade } from "material-ui/utils/colorManipulator";
//Local
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

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey300,
    primary2Color: grey900,
    primary3Color: grey400,
    accent1Color: grey500,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: darkBlack,
    canvasColor: grey100,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: grey300,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack
  }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
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
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
