import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import {
  getUser,
  updateGuestEmail,
  getUserByUserId,
  updateShippingAddress,
  updateBillingAddress
} from "../../ducks/user";
//Material-ui
import { Step, Stepper, StepLabel } from "material-ui/Stepper";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
//Local
import Checkout from "../Checkout/Checkout";
import "./CheckoutInfo.css";

class CheckoutInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      shippingFirstName: "",
      shippingLastName: "",
      shippingAddress: "",
      shippingCity: "",
      shippingState: "",
      shippingCountry: "",
      shippingZip: "",
      billingFirstName: "",
      billingLastName: "",
      billingAddress: "",
      billingCity: "",
      billingState: "",
      billingCountry: "",
      billingZip: "",
      finished: false,
      stepIndex: 0
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.submitEmail = this.submitEmail.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.submitShippingMethod = this.submitShippingMethod.bind(this);
    this.submitBillingMethod = this.submitBillingMethod.bind(this);
  }

  componentDidMount() {
    const { getUser } = this.props;
    getUser();
  }

  handleEmail(val) {
    this.setState({
      email: val
    });
  }

  submitEmail() {
    const { getUserByUserId, updateGuestEmail } = this.props;
    const { email } = this.state;
    updateGuestEmail(email)
      .then(res => {
        getUserByUserId();
      })
      .catch(console.log);
  }

  submitShippingMethod() {
    const {
      stepIndex,
      shippingFirstName,
      shippingLastName,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingCountry,
      shippingZip
    } = this.state;
    const { updateShippingAddress, getUserByUserId } = this.props;
    this.setState({
      stepIndex: stepIndex + 1
    });

    updateShippingAddress(
      shippingFirstName,
      shippingLastName,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingCountry,
      shippingZip
    ).then(res => {
      getUserByUserId();
    });
  }

  submitBillingMethod() {
    const {
      stepIndex,
      billingFirstName,
      billingLastName,
      billingAddress,
      billingCity,
      billingState,
      billingCountry,
      billingZip
    } = this.state;
    const { updateBillingAddress } = this.props;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 1
    });

    updateBillingAddress(
      billingFirstName,
      billingLastName,
      billingAddress,
      billingCity,
      billingState,
      billingCountry,
      billingZip
    ).then(res => {
      getUserByUserId();
    });
  }

  handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1
      });
    }
  }

  handleAddressChange(prop, val) {
    this.setState({ [prop]: val });
  }

  getStepContent(stepIndex) {
    const {
      shippingFirstName,
      shippingLastName,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingCountry,
      shippingZip,
      billingFirstName,
      billingLastName,
      billingAddress,
      billingCity,
      billingState,
      billingCountry,
      billingZip
    } = this.state;

    let caseZero = (
      <div className="check-whole-container">
        <div className="checkout-info-container">
          <div className="first-name-container">
            <label className="info-labels">First Name</label>
            <input
              className="first-name-input"
              placeholder="First Name"
              value={shippingFirstName}
              onChange={e =>
                this.handleAddressChange("shippingFirstName", e.target.value)
              }
            />
          </div>
          <div className="last-name-container">
            <label className="info-labels">Last Name</label>
            <input
              className="last-name-input"
              placeholder="Last Name"
              value={shippingLastName}
              onChange={e =>
                this.handleAddressChange("shippingLastName", e.target.value)
              }
            />
          </div>
        </div>

        <div className="address-container">
          <label className="info-labels">Address</label>
          <input
            className="address-input"
            placeholder="Address (Optional: Apt,Suite,Etc.)"
            value={shippingAddress}
            onChange={e =>
              this.handleAddressChange("shippingAddress", e.target.value)
            }
          />
        </div>
        <div className="checkout-info-container">
          <div className="city-container">
            <label className="info-labels">City</label>
            <input
              className="city-input"
              placeholder="City"
              value={shippingCity}
              onChange={e =>
                this.handleAddressChange("shippingCity", e.target.value)
              }
            />
          </div>
          <div className="state-container">
            <label className="info-labels">State</label>
            <input
              className="state-input"
              placeholder="State"
              value={shippingState}
              onChange={e =>
                this.handleAddressChange("shippingState", e.target.value)
              }
            />
          </div>
        </div>

        <div className="checkout-info-container">
          <div className="country-container">
            <label className="info-labels">Country</label>
            <input
              className="country-input"
              placeholder="Country"
              value={shippingCountry}
              onChange={e =>
                this.handleAddressChange("shippingCountry", e.target.value)
              }
            />
          </div>
          <div className="zip-container">
            <label className="info-labels">Zip</label>
            <input
              className="zip-input"
              placeholder="Zip Code"
              value={shippingZip}
              onChange={e =>
                this.handleAddressChange("shippingZip", e.target.value)
              }
            />
          </div>
        </div>
      </div>
    );

    let caseOne = (
      <div className="check-whole-container">
        <div className="checkout-info-container">
          <div className="first-name-container">
            <label className="info-labels">First Name</label>
            <input
              className="first-name-input"
              placeholder="First Name"
              value={billingFirstName}
              onChange={e =>
                this.handleAddressChange("billingFirstName", e.target.value)
              }
            />
          </div>
          <div className="last-name-container">
            <label className="info-labels">Last Name</label>
            <input
              className="last-name-input"
              placeholder="Last Name"
              value={billingLastName}
              onChange={e =>
                this.handleAddressChange("billingLastName", e.target.value)
              }
            />
          </div>
        </div>

        <div className="address-container">
          <label className="info-labels">Address</label>
          <input
            className="address-input"
            placeholder="Address (Optional: Apt,Suite,Etc.)"
            value={billingAddress}
            onChange={e =>
              this.handleAddressChange("billingAddress", e.target.value)
            }
          />
        </div>
        <div className="checkout-info-container">
          <div className="city-container">
            <label className="info-labels">City</label>
            <input
              className="city-input"
              placeholder="City"
              value={billingCity}
              onChange={e =>
                this.handleAddressChange("billingCity", e.target.value)
              }
            />
          </div>
          <div className="state-container">
            <label className="info-labels">State</label>
            <input
              className="state-input"
              placeholder="State"
              value={billingState}
              onChange={e =>
                this.handleAddressChange("billingState", e.target.value)
              }
            />
          </div>
        </div>

        <div className="checkout-info-container">
          <div className="country-container">
            <label className="info-labels">Country</label>
            <input
              className="country-input"
              placeholder="Country"
              value={billingCountry}
              onChange={e =>
                this.handleAddressChange("billingCountry", e.target.value)
              }
            />
          </div>
          <div className="zip-container">
            <label className="info-labels">Zip</label>
            <input
              className="zip-input"
              placeholder="Zip Code"
              value={billingZip}
              onChange={e =>
                this.handleAddressChange("billingZip", e.target.value)
              }
            />
          </div>
        </div>
      </div>
    );

    switch (stepIndex) {
      case 0:
        return <div className="input-address-container">{caseZero}</div>;
      case 1:
        return <div className="input-address-container">{caseOne}</div>;
      default:
        return <div />;
    }
  }

  render() {
    const { finished, stepIndex, email } = this.state;
    const { user = {}, totalAmnt } = this.props;
    console.log(user.user_email);
    return (
      <div className="checkout-main-container">
        {!user.user_email ? (
          <section className="checkout-options-container">
            <div className="login-checkout-wrapper">
              <label className="login-checkout-title">Login/Register</label>
              <RaisedButton
                label="Login"
                primary={true}
                className="submit-login"
                href={process.env.REACT_APP_LOGIN}
              />
            </div>

            <div className="guest-checkout-wrapper">
              <label className="guest-checkout-title">Guest Checkout</label>
              <TextField
                floatingLabelText="E-mail Address"
                floatingLabelFixed={true}
                type="email"
                value={email}
                hintText="billy.bob@example.com"
                errorText="This field is required"
                className="guest-textfield"
                inputStyle={{ color: "#212121" }}
                onChange={e => this.handleEmail(e.target.value)}
              />
              <RaisedButton
                label="Submit"
                primary={true}
                className="submit-guest"
                disabled={!email}
                onClick={this.submitEmail}
              />
            </div>
          </section>
        ) : (
          <div className="stepper">
            <Stepper activeStep={stepIndex}>
              <Step>
                <StepLabel>Shipping</StepLabel>
              </Step>
              <Step>
                <StepLabel>Billing</StepLabel>
              </Step>
            </Stepper>
            <div className="finished-wrapper">
              {finished ? (
                <div>
                  <Checkout name={"Pandamonium"} amount={totalAmnt} />
                </div>
              ) : (
                <div className="step-content">
                  <div>{this.getStepContent(stepIndex)}</div>
                  <div className="stepper-buttons-wrapper">
                    <RaisedButton
                      label="Back"
                      primary={true}
                      disabled={stepIndex === 0}
                      onClick={this.handlePrev}
                      className="back-stepper"
                    />
                    {stepIndex === 0 ? (
                      <RaisedButton
                        label="Next"
                        primary={true}
                        className="next-stepper"
                        onClick={this.submitShippingMethod}
                      />
                    ) : (
                      <RaisedButton
                        label="Payment"
                        primary={true}
                        className="next-stepper"
                        onClick={this.submitBillingMethod}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    totalAmnt: state.product.totalAmnt,
    user: state.user.user
  };
};

export default connect(mapStateToProps, {
  getUser,
  updateGuestEmail,
  getUserByUserId,
  updateShippingAddress,
  updateBillingAddress
})(CheckoutInfo);
