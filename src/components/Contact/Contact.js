import React, { Component } from "react";
import "./Contact.css";

class Contact extends Component {
  render() {
    return (
      <article>
        <header>
          <div className="title-bar-contact">
            <h2>
              <span>Contact Pandamonium Sports Nutrition</span>
            </h2>
          </div>
        </header>
        <section className="contact-content">
          <p className="contact-content-description">
            Contact us at any time! We are available 24/7! Please call{" "}
            <span>1-800-000-0000</span> and we will get back to you as soon as
            possible.
          </p>

          <h3>
            <b>Email Address:</b>
          </h3>
          <p className="contact-content-description">
            <span>support@pandamoniumnutrition.com</span>
          </p>
          <h3>
            <b>Business Address:</b>
          </h3>
          <p className="contact-content-top-description">500 S. Ervay St.</p>
          <p className="contact-content-description">Dallas, TX 75201</p>
        </section>
      </article>
    );
  }
}
export default Contact;
