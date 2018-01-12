import React, { Component } from "react";
import MdPerson from "react-icons/lib/md/person";
import MdShoppingCart from "react-icons/lib/md/shopping-cart";
import { slide as Menu } from "react-burger-menu";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../ducks/user";
import logo from "./Panda_Logo.png";
import "./NavBar.css";

class NavBar extends Component {
  render() {
    return (
      <nav className="nav-main-wrapper">
        <div className="nav-top-wrapper">
          {!this.props.user.user_email ? (
            <a href={process.env.REACT_APP_LOGIN}>
              <div className="nav-account-icon">
                <MdPerson />
              </div>
            </a>
          ) : (
            <Link to="/profile">
              <div className="nav-account-icon">
                <MdPerson />
              </div>
            </Link>
          )}
        </div>
        <Menu>
          <NavLink className="menu-item-wrapper" to="/">
            <p className="menu-item"> Home</p>
          </NavLink>

          <NavLink className="menu-item-wrapper" to="/shop">
            <p className="menu-item">Shop</p>
          </NavLink>

          <NavLink className="menu-item-wrapper" to="/about">
            <p className="menu-item">About</p>
          </NavLink>

          <NavLink className="menu-item-wrapper" to="/contact">
            <p className="menu-item">Contact</p>
          </NavLink>
        </Menu>
        <div className="nav-center-wrapper">
          <img id="main-logo" src={logo} alt="" />

          <Link to="/cart">
            <div className="nav-cart-wrapper">
              <MdShoppingCart className="nav-cart-icon" />
            </div>
          </Link>
        </div>
      </nav>

      // <nav className="nav-main-wrapper">
      //   <div className="nav-top-wrapper">
      //     {!this.props.user.user_email ? (
      //       <a href={process.env.REACT_APP_LOGIN}>
      //         <div className="nav-account-icon">
      //           <MdPerson />
      //         </div>
      //       </a>
      //     ) : (
      //       <Link to="/profile">
      //         <div className="nav-account-icon">
      //           <MdPerson />
      //         </div>
      //       </Link>
      //     )}
      //     {/* <Link to="/cart"><button className="nav-button">Cart</button></Link> */}
      //   </div>

      //   <div className="nav-center-wrapper">
      //     <img id="main-logo" src={logo} alt="" />

      //     <div className="nav-link-wrapper">
      //       <div className="nav-link">
      //         <Link to="/">Home</Link>
      //       </div>
      //       <div className="nav-link">
      //         <Link to="/shop">Shop</Link>
      //       </div>
      //       <div className="nav-link">
      //         <Link to="/contact">Contact</Link>
      //       </div>
      //       <div className="nav-link">
      //         <Link to="/about">About</Link>
      //       </div>
      //     </div>
      //   </div>

      //   {/* <div>
      //       {Search}
      //       </div> */}
      // </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(NavBar);
