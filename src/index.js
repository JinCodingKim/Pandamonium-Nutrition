import React from "react";
import ReactDOM from "react-dom";
//React-router-dom
import { BrowserRouter as Router } from "react-router-dom";
//React-redux
import { Provider } from "react-redux";
//Material-ui
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { fade } from "material-ui/utils/colorManipulator";
//Redux store
import store from "./store";
//Local
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const muiTheme = getMuiTheme({
  palette: {
    //primary1color: changes NavBar Background & Primary Raised Button Background
    primary1Color: "#fafafa",
    //accent1color: changes Secondary Raised Button Background
    accent1Color: "#fafafa",
    //textColor: changes Icon Color & Regular Text & Default Raised Button Text & Menu Text
    textColor: "#000000",
    //canvasColor: regular page background color
    canvasColor: "#fafafa",
    //borderColor: Text Field underline color
    borderColor: "#000000",
    //secondaryTextColor: changes Sub Text Color
    secondaryTextColor: "#c62828",
    //alternateTextColor: changes Default Raised Button Background, Primary Raised Button Text, Secondary Raised Button Text
    alternateTextColor: "#000000",
    //shadowColor: changes shadow color
    shadowColor: "#fafafa"
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
