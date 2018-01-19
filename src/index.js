import React from "react";
import ReactDOM from "react-dom";
//React-router-dom
import { BrowserRouter as Router } from "react-router-dom";
//React-redux
import { Provider } from "react-redux";
//Material-ui
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {
  grey50,
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
//Redux store
import store from "./store";
//Local
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey50,
    primary2Color: grey900,
    primary3Color: grey400,
    accent1Color: grey100,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: darkBlack,
    canvasColor: grey100,
    borderColor: fullBlack,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: grey300,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <MuiThemeProvider muiTheme={muiTheme}>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
