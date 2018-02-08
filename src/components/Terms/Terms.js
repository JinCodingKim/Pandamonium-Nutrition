import React, { Component } from "react";
import "./Terms.css";

class Terms extends Component {
  render() {
    return (
      <article>
        <header>
          <div className="title-bar-terms">
            <h2>
              <span>Terms & Conditions</span>
            </h2>
          </div>
        </header>
        <section className="terms-content">
          <div className="terms-content-wrapper">
            <h3>
              <b>Shipping - Domestic Policy</b>
            </h3>
            <p className="terms-info-content">
              We ship all orders out on the same day, if placed before 4:00PM
              CST. We offer several shipping options, but UPS is the recommended
              shipping method within the USA.
            </p>
            <br />
            <p className="terms-info-content">
              Most shipments will take 2-7 business days for delivery. If a
              package is lost or damaged within transit we will reship it at no
              additional cost.
            </p>{" "}
            <br />
            <p className="terms-info-content">
              In the instance that the package is lost in transit, it can not be
              refunded.
            </p>
            <br />
            <p className="terms-info-content">
              Once an item is scanned and updated as <b>DELIVERED</b> within the
              United States (USA), it is considered delivered and we will not
              consider a free reshipment for the customer.
            </p>
          </div>
          <div className="terms-content-wrapper">
            <h3>
              <b>Returns - Domestic Policy</b>
            </h3>
            <p className="terms-info-content">
              Our customers can return any of our products within the
              limitations of the package being unopened and within 14 day of
              delivery. Any items that have been opened or has a broken seal
              will not be eligible for product return. Orders cancelled prior to
              shipment are entitled to a refund.
            </p>
            <br />
            <p className="terms-info-content">
              For defective or incorrect items, and/or shipping mishap we will
              provide and pay for a return label. All items must be pre-approved
              for return by contacting us through the “CONTACT” page.
            </p>
            <br />
            <p className="terms-info-content">
              Full refunds for returned packages will only be issued if the
              product(s) are unopened, undamaged, and within the 14 days of
              purchasing. No refunds will be issued for opened merchandise.
            </p>
            <br />
            <p className="terms-info-content">
              Any and all shipping costs are non-refundable. When shipping
              return item(s), the customer must provide delivery confirmation or
              we cannot confirm any refund.
            </p>
            <br />
            <p className="terms-info-content">
              Any packages returned to us by the designated carrier because the
              customer was not available to receive the package or due to
              incorrect shipping information may be subject to additional
              shipping costs to reship.
            </p>
          </div>
        </section>
      </article>
    );
  }
}
export default Terms;
