import React, { Component } from "react";
import "./Policy.css";

class Policy extends Component {
  render() {
    return (
      <article>
        <header>
          <div className="title-bar-policy">
            <h2>
              <span>Privacy Policy</span>
            </h2>
          </div>
        </header>
        <section className="policy-content">
          <div className="policy-content-wrapper">
            <p className="policy-info-content">
              The statements throughout this website concerning all dietary
              supplements have not been approved by the Food and Drug
              Administration (FDA). These products are not intended to diagnose,
              treat, cure, or prevent any disease.
            </p>
            <br />
            <p className="policy-info-content">
              We will never share your personal/private information with any 3rd
              party that you have no authorized or given consent to unless you
              give us permission in writing. Checkout with Pandamonium Sports
              Nutrition is completely safe and secure.
            </p>
            <br />
            <p className="policy-info-content">
              These products are not intended to diagnose, treat, cure, or
              prevent any disease. Always consult your physician before
              beginning any diet, supplement, or exercise regime. Pandamonium
              Sports Nutrition products are packaged within the USA. All
              products are created within GMP facilities.
            </p>
            <br />
            <p className="policy-info-content">
              <b>Warnings:</b> Consult your licensed physician prior to use,
              especially if you have or are at risk for high blood pressure,
              heart, kidney, thyroid, prostate or psychiatric disease, or any
              other medical condition. Consult your physician prior to use if
              you are using any other medications. Do not use if you are
              pregnant, nursing, or may become pregnant. Do not use more than
              the recommended dosage. Discontinue use and consult a physician if
              any adverse reactions occur. As with all supplements: keep out of
              reach from children and animals.
            </p>
          </div>
        </section>
      </article>
    );
  }
}
export default Policy;
