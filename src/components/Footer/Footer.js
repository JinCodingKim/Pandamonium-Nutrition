import React, { Component } from "react";
//React-Router
import { NavLink } from "react-router-dom";
//Axios
import axios from "axios";
//Sweetalert2
import swal from "sweetalert2";
//Local
import "./Footer.css";
import facebook from "./facebook.png";
import instagram from "./instagram.png";
import twitter from "./twitter.png";
import ae from "./ae.svg";
import discover from "./discover.svg";
import mastercard from "./mc.svg";
import visa from "./visa.svg";

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailVal: ""
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.confirmSignup = this.confirmSignup.bind(this);
  }

  handleEmail(val) {
    this.setState({
      emailVal: val
    });
  }

  confirmSignup(event) {
    const { emailVal } = this.state;
    if (event.keyCode === 13) {
      axios
        .post("/api/subscription", { subscription_email: emailVal })
        .then(res => {
          swal({
            title: `Thanks for signing up!`,
            type: "success",
            confirmButtonText: "Back to Shopping",
            confirmButtonColor: "#ff6d00"
          });
          this.setState({
            emailVal: ""
          });
        })
        .catch(console.log);
    }
  }

  render() {
    const { emailVal } = this.state;
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
            <NavLink className="links-body" to="/terms-conditions">
              <p>Terms & Conditions</p>
            </NavLink>
            <NavLink className="links-body" to="/privacy-policy">
              <p>Privacy Policy</p>
            </NavLink>
            <NavLink className="links-body" to="/disclaimer">
              <p>Disclaimer</p>
            </NavLink>
          </div>

          <div className="links-sub">
            <h3 className="links-header">SOCIAL NETWORKS</h3>
            <div className="icon-container">
              <a
                href="https://www.facebook.com"
                alt=""
                className="social-links"
              >
                <img src={facebook} alt="" />
              </a>
              <a
                href="https://www.instagram.com"
                alt=""
                className="social-links"
              >
                <img src={instagram} alt="" />
              </a>
              <a href="https://www.twitter.com" alt="" className="social-links">
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
                value={emailVal}
                onKeyDown={this.confirmSignup}
              />
            </div>
          </div>

          <div className="disclaimer-container">
            <p className="footer-company">2017 Pandamonium Sports Nutrition.</p>
            <div className="footer-payments-wrapper">
              <img src={ae} alt="" className="payments" />

              <img src={discover} alt="" className="payments" />

              <img src={mastercard} alt="" className="payments" />

              <img src={visa} alt="" className="payments" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Footer;
