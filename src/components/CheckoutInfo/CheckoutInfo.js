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
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
//Sweetalert2
import swal from "sweetalert2";
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
    updateGuestEmail(email).then(res => {
      getUserByUserId();
    });
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
      shippingZip,
      email
    } = this.state;
    const {
      updateShippingAddress,
      updateGuestEmail,
      getUserByUserId
    } = this.props;
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
      billingZip,
      email
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
      <Paper zDepth={2}>
        <TextField
          hintText="First Name"
          style={{
            height: 30,
            width: "55%",
            marginRight: "5%",
            fontSize: 12
          }}
          inputStyle={{ color: "#212121" }}
          underlineShow={false}
          value={shippingFirstName}
          onChange={e =>
            this.handleAddressChange("shippingFirstName", e.target.value)
          }
        />
        <TextField
          hintText="Last Name"
          style={{
            height: 30,
            width: "35%",
            marginLeft: "5%",
            fontSize: 12
          }}
          inputStyle={{ color: "#212121" }}
          underlineShow={false}
          value={shippingLastName}
          onChange={e =>
            this.handleAddressChange("shippingLastName", e.target.value)
          }
        />
        <Divider />
        <TextField
          hintText="Address & (Apt,suite,etc.)"
          style={{ height: 30, width: "100%", fontSize: 12 }}
          inputStyle={{ color: "#212121" }}
          underlineShow={false}
          value={shippingAddress}
          onChange={e =>
            this.handleAddressChange("shippingAddress", e.target.value)
          }
        />
        <Divider />
        <TextField
          hintText="City"
          style={{
            height: 30,
            width: "55%",
            marginRight: "5%",
            fontSize: 12
          }}
          inputStyle={{ color: "#212121" }}
          underlineShow={false}
          value={shippingCity}
          onChange={e =>
            this.handleAddressChange("shippingCity", e.target.value)
          }
        />
        <TextField
          hintText="State"
          style={{
            height: 30,
            width: "35%",
            marginLeft: "5%",
            fontSize: 12
          }}
          inputStyle={{ color: "#212121" }}
          underlineShow={false}
          value={shippingState}
          onChange={e =>
            this.handleAddressChange("shippingState", e.target.value)
          }
        />
        <Divider />
        <TextField
          hintText="Country"
          style={{
            height: 30,
            width: "70%",
            marginRight: "5%",
            fontSize: 12
          }}
          inputStyle={{ color: "#212121" }}
          underlineShow={false}
          value={shippingCountry}
          onChange={e =>
            this.handleAddressChange("shippingCountry", e.target.value)
          }
        />
        <TextField
          hintText="Zip code"
          style={{
            height: 30,
            width: "20%",
            marginLeft: "5%",
            fontSize: 12
          }}
          inputStyle={{ color: "#212121" }}
          underlineShow={false}
          value={shippingZip}
          onChange={e =>
            this.handleAddressChange("shippingZip", e.target.value)
          }
        />
        <Divider />
      </Paper>
    );

    let caseOne = (
      <Paper zDepth={2}>
        <TextField
          hintText="First Name"
          style={{
            height: 30,
            width: "55%",
            marginRight: "5%",
            fontSize: 12
          }}
          inputStyle={{ color: "#212121" }}
          underlineShow={false}
          value={billingFirstName}
          onChange={e =>
            this.handleAddressChange("billingFirstName", e.target.value)
          }
        />
        <TextField
          hintText="Last Name"
          style={{
            height: 30,
            width: "35%",
            marginLeft: "5%",
            fontSize: 12
          }}
          inputStyle={{ color: "#212121" }}
          underlineShow={false}
          value={billingLastName}
          onChange={e =>
            this.handleAddressChange("billingLastName", e.target.value)
          }
        />
        <Divider />
        <TextField
          hintText="Address & (Apt,suite,etc.)"
          style={{ height: 30, width: "100%", fontSize: 12 }}
          inputStyle={{ color: "#212121" }}
          underlineShow={false}
          value={billingAddress}
          onChange={e =>
            this.handleAddressChange("billingAddress", e.target.value)
          }
        />
        <Divider />
        <TextField
          hintText="City"
          style={{
            height: 30,
            width: "55%",
            marginRight: "5%",
            fontSize: 12
          }}
          inputStyle={{ color: "#212121" }}
          underlineShow={false}
          value={billingCity}
          onChange={e =>
            this.handleAddressChange("billingCity", e.target.value)
          }
        />
        <TextField
          hintText="State"
          style={{
            height: 30,
            width: "35%",
            marginLeft: "5%",
            fontSize: 12
          }}
          inputStyle={{ color: "#212121" }}
          underlineShow={false}
          value={billingState}
          onChange={e =>
            this.handleAddressChange("billingState", e.target.value)
          }
        />
        <Divider />
        <TextField
          hintText="Country"
          style={{
            height: 30,
            width: "70%",
            marginRight: "5%",
            fontSize: 12
          }}
          inputStyle={{ color: "#212121" }}
          underlineShow={false}
          value={billingCountry}
          onChange={e =>
            this.handleAddressChange("billingCountry", e.target.value)
          }
        />
        <TextField
          hintText="Zip code"
          style={{
            height: 30,
            width: "20%",
            marginLeft: "5%",
            fontSize: 12
          }}
          inputStyle={{ color: "#212121" }}
          underlineShow={false}
          value={billingZip}
          onChange={e => this.handleAddressChange("billingZip", e.target.value)}
        />
        <Divider />
      </Paper>
    );

    switch (stepIndex) {
      case 0:
        return <div className="input-address-container">{caseZero}</div>;
      case 1:
        return <div className="input-address-container">{caseOne}</div>;
    }
  }

  render() {
    // console.log(this.props.user);
    const { finished, stepIndex, email } = this.state;
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
                style={{ height: 30, width: 160 }}
                labelStyle={{
                  fontSize: 12,
                  fontWeight: "bold"
                }}
                href={process.env.REACT_APP_LOGIN}
              />
            </div>

            <div className="guest-checkout-wrapper">
              <label className="guest-checkout-title">Guest Checkout</label>
              <TextField
                floatingLabelText="E-mail Address"
                floatingLabelFixed={true}
                hintText="billy.bob@example.com"
                errorText="This field is required"
                style={{ width: 160, fontSize: 12 }}
                inputStyle={{ color: "#212121" }}
                onChange={e => this.handleEmail(e.target.value)}
              />
              <RaisedButton
                label="Submit"
                primary={true}
                style={{ height: 30, width: 160 }}
                labelStyle={{
                  fontSize: 12,
                  fontWeight: "bold"
                }}
                disabled={!email}
                onClick={this.submitEmail}
              />
            </div>
          </section>
        ) : (
          <div className="stepper">
            <Stepper activeStep={stepIndex}>
              <Step>
                <StepLabel>Shipping Method</StepLabel>
              </Step>
              <Step>
                <StepLabel>Billing Method</StepLabel>
              </Step>
            </Stepper>
            <div className="finished-wrapper">
              {finished ? (
                <div>
                  <Checkout name={"Pandamonium"} amount={totalAmnt} />
                </div>
              ) : (
                <div>
                  <div>{this.getStepContent(stepIndex)}</div>
                  <div className="stepper-buttons-wrapper">
                    <RaisedButton
                      label="Back"
                      primary={true}
                      disabled={stepIndex === 0}
                      onClick={this.handlePrev}
                      style={{ height: 30, width: 100, marginRight: 15 }}
                    />
                    {stepIndex === 0 ? (
                      <RaisedButton
                        label="Next"
                        primary={true}
                        style={{ height: 30, width: 100, marginLeft: 15 }}
                        onClick={this.submitShippingMethod}
                      />
                    ) : (
                      <RaisedButton
                        label="Payment"
                        primary={true}
                        style={{ height: 30, width: 100, marginLeft: 15 }}
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
