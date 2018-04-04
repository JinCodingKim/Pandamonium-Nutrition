import React from "react";
import ReactDOM from "react-dom";
//React-router-dom
import { BrowserRouter as Router } from "react-router-dom";
//React-redux
import { Provider } from "react-redux";
//Material-ui
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
//Redux store
import store from "./store";
//Local
import ScrollToTop from "./ScrollToTop";
import App from "./App";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#ff6d00",
    accent1Color: "#000000",
    textColor: "#eeeeee",
    canvasColor: "#fafafa",
    borderColor: "#BDBDBD",
    secondaryTextColor: "#fafafa",
    alternateTextColor: "#eeeeee",
    shadowColor: "#fafafa"
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ScrollToTop>
        <MuiThemeProvider muiTheme={muiTheme}>
          <App />
        </MuiThemeProvider>
      </ScrollToTop>
    </Router>
  </Provider>,
  document.getElementById("root")
);
