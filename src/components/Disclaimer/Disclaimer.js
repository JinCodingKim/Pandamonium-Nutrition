import React, { Component } from "react";
import "./Disclaimer.css";

class Disclaimer extends Component {
  render() {
    return (
      <article>
        <header>
          <div className="title-bar-disclaimer">
            <h2>
              <span>Disclaimer</span>
            </h2>
          </div>
        </header>
        <section className="disclaimer-content">
          <div className="disclaimer-content-wrapper">
            <p className="disclaimer-info-content">
              All statements on the Pandamonium Sports Nutrition site concerning
              all dietary supplements have not been verified by the Food and
              Drug Administration (FDA). These statements have not been
              evaluated by the Food and Drug Administration (FDA). These
              products are not intended to diagnose, treat, cure, or prevent any
              disease. Always consult your physician before beginning any diet,
              supplement, or exercise regime. Pandamonium Sports Nutrition
              products are packaged within the USA. All products are created
              within GMP facilities.
            </p>
            <br />
            <p className="disclaimer-info-content">
              <b>Warnings:</b>
              Consult your licensed physician prior to use, especially if you
              have or are at risk for high blood pressure, heart, kidney,
              thyroid, prostate or psychiatric disease, or any other medical
              condition. Consult your physician prior to use if you are using
              any other medications. Do not use if you are pregnant, nursing, or
              may become pregnant. Do not use more than the recommended dosage.
              Discontinue use and consult a physician if any adverse reactions
              occur. As with all supplements: keep out of reach from children
              and animals. Furthermore, this website is completely fictional,
              every item on this website is NOT real, and created for web
              development project purposes.
            </p>
          </div>
        </section>
      </article>
    );
  }
}
export default Disclaimer;
