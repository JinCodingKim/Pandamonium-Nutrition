import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav>
        <div>
          <div>
            <a href={process.env.REACT_APP_LOGIN}>
              <button>Login</button>
            </a>
            {/* <Link to="/cart"><button>Cart</button></Link> */}
          </div>

          <div>
            <Link to="/">Home</Link>
            {/* //Shop Drop down menu
          <Link to="/Shop">Shop</Link> */}
            {/* <Link to="/Contact">Contact</Link>
          <Link to="/About">About</Link> */}
          </div>
        </div>
      </nav>
    );
  }
}
export default NavBar;
