import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../ducks/user";
import logo from "./Panda_Logo.png";
import account from "./Account_Logo.png";
import "./NavBar.css";

class NavBar extends Component {
  render() {
    return (
      <nav className="nav-main-wrapper">
        <div className="nav-top-wrapper">
          {!this.props.user ? (
            <a href={process.env.REACT_APP_LOGIN}>
              <img className="nav-button" src={account} alt="" />
            </a>
          ) : (
            <Link to="/profile">
              <img className="nav-button" src={account} alt="" />
            </Link>
          )}
          {/* <Link to="/cart"><button className="nav-button">Cart</button></Link> */}
        </div>

        <div className="nav-center-wrapper">
          <img id="main-logo" src={logo} alt="" />

          <div className="nav-link-wrapper">
            <div className="nav-link">
              <Link to="/">Home</Link>
            </div>
            <div className="nav-link">
              <Link to="/Shop">Shop</Link>
            </div>
            <div className="nav-link">
              <Link to="/Contact">Contact</Link>
            </div>
            <div className="nav-link">
              <Link to="/About">About</Link>
            </div>
          </div>
        </div>

        {/* <div>
            {Search}
            </div> */}
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(NavBar);
