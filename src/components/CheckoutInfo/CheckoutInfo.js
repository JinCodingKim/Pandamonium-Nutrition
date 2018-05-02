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
import Checkbox from "material-ui/Checkbox";
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
      validEmail: false,
      finished: false,
      stepIndex: 0,
      checked: false
    };
    this.handleCheck = this.handleCheck.bind(this);
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

  handleCheck() {
    this.setState({
      checked: !this.state.checked
    });
  }

  handleEmail(val) {
    const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(val)
      ? this.setState({
          email: val,
          validEmail: true
        })
      : this.setState({
          validEmail: false
        });
  }

  submitEmail() {
    console.log("hit");
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
      billingZip,
      checked
    } = this.state;

    let caseZero = (
      <div className="check-whole-container">
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
    );

    let caseOne = (
      <div className="check-whole-container">
        <div className="checkbox-container">
          <label className="info-labels">Same as shipping information</label>
          <Checkbox
            iconStyle={{ fill: "ff6d00" }}
            checked={checked}
            onCheck={this.handleCheck}
          />
        </div>
        <div className="first-name-container">
          <label className="info-labels">First Name</label>
          <input
            className="first-name-input"
            placeholder="First Name"
            value={checked ? shippingFirstName : billingFirstName}
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
            value={checked ? shippingLastName : billingLastName}
            onChange={e =>
              this.handleAddressChange("billingLastName", e.target.value)
            }
          />
        </div>

        <div className="address-container">
          <label className="info-labels">Address</label>
          <input
            className="address-input"
            placeholder="Address (Optional: Apt,Suite,Etc.)"
            value={checked ? shippingAddress : billingAddress}
            onChange={e =>
              this.handleAddressChange("billingAddress", e.target.value)
            }
          />
        </div>
        <div className="city-container">
          <label className="info-labels">City</label>
          <input
            className="city-input"
            placeholder="City"
            value={checked ? shippingCity : billingCity}
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
            value={checked ? shippingState : billingState}
            onChange={e =>
              this.handleAddressChange("billingState", e.target.value)
            }
          />
        </div>

        <div className="country-container">
          <label className="info-labels">Country</label>
          <input
            className="country-input"
            placeholder="Country"
            value={checked ? shippingCountry : billingCountry}
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
            value={checked ? shippingZip : billingZip}
            onChange={e =>
              this.handleAddressChange("billingZip", e.target.value)
            }
          />
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
    console.log(this.state);
    const { finished, stepIndex, validEmail } = this.state;
    const { user = {}, totalAmnt } = this.props;
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
                floatingLabelText="Email"
                floatingLabelFixed={true}
                hintText="billy.bob@example.com"
                errorText={validEmail ? null : "Enter a valid email address"}
                className="guest-textfield"
                inputStyle={{ color: "#212121" }}
                onChange={(event, val) => this.handleEmail(val)}
              />
              <RaisedButton
                label="Submit"
                primary={true}
                className="submit-guest"
                disabled={!validEmail}
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
                  <div className="step-content-wrapper">
                    {this.getStepContent(stepIndex)}
                  </div>
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
