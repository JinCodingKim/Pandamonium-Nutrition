import React, { Component } from "react";
//React-Router
import { NavLink } from "react-router-dom";
//Local
import "./Footer.css";
import facebook from "./facebook.png";
import instagram from "./instagram.png";
import twitter from "./twitter.png";

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailVal: ""
    };

    this.handleEmail = this.handleEmail.bind(this);
  }

  handleEmail(val) {
    this.setState({
      emailVal: val
    });
  }

  render() {
    return (
      <div className="footer-main-container">
        <div className="links-container">
          <div className="links-sub">
            <h3 className="links-header">QUICK LINKS</h3>
            <NavLink className="links-body" to="/">
              <p>Home</p>
            </NavLink>
            <NavLink className="links-body" to="/contact">
              <p>Contact</p>
            </NavLink>
            <NavLink className="links-body" to="/terms">
              <p>Terms & Conditions</p>
            </NavLink>
            <NavLink className="links-body" to="/policy">
              <p>Privacy Policy</p>
            </NavLink>
            <NavLink className="links-body" to="/disclaimer">
              <p>Disclaimer</p>
            </NavLink>
          </div>
          <div className="links-sub">
            <h3 className="links-header">SOCIAL NETWORKS</h3>
            <div className="icon-container">
              <a href="www.facebook.com" className="social-links">
                <img src={facebook} alt="" />
              </a>
              <a href="www.instagram.com" className="social-links">
                <img src={instagram} alt="" />
              </a>
              <a href="www.twitter.com" className="social-links">
                <img src={twitter} alt="" />
              </a>
            </div>
          </div>
          <div className="links-sub">
            <h3 className="links-header">JOIN OUR MAILING LIST</h3>
            <h4 className="mailing-sub">
              Stay up to date on new products and specials!
            </h4>
            <div className="mailing-input-container">
              <input
                className="mailing-input"
                onChange={e => this.handleEmail(e.target.value)}
                type="email"
                placeholder="Enter email"
              />
              {/* <button /> */}
            </div>
          </div>
        </div>
        <div className="disclaimer-container" />
      </div>
    );
  }
}
export default Footer;
