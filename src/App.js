import React, { Component } from "react";
//Local
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import routes from "./routes.js";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        {routes}
        <Footer />
      </div>
    );
  }
}

export default App;
