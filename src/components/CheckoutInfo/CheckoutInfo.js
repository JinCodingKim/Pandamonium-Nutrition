import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import { getUser, updateGuestEmail, getUserByUserId } from "../../ducks/user";
//Material-ui
import { Step, Stepper, StepLabel } from "material-ui/Stepper";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
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
      finished: false,
      stepIndex: 0
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.submitEmail = this.submitEmail.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
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

  handleNext() {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
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

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return "";
      case 1:
        return "";
      case 2:
        return "";
      case 3:
        return "";
    }
  }

  render() {
    console.log(this.props.user);
    const { finished, stepIndex, email } = this.state;
    const { user = {}, totalAmnt } = this.props;
    const contentStyle = { margin: "0 16px" };

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
          <div style={{ width: "100%", maxWidth: 700, margin: "auto" }}>
            <Stepper activeStep={stepIndex}>
              <Step>
                <StepLabel>Shipping Address</StepLabel>
              </Step>
              <Step>
                <StepLabel>Billing Address</StepLabel>
              </Step>
              <Step>
                <StepLabel>Payment</StepLabel>
              </Step>
            </Stepper>
            <div style={contentStyle}>
              {finished ? (
                <div>
                  <Checkout
                    name={"Pandamonium"}
                    // description={"Thanks for Ordering!"}
                    amount={totalAmnt}
                  />
                </div>
              ) : (
                <div>
                  <p>{this.getStepContent(stepIndex)}</p>
                  <div style={{ marginTop: 12 }}>
                    <FlatButton
                      label="Back"
                      disabled={stepIndex === 0}
                      onClick={this.handlePrev}
                      style={{ marginRight: 12 }}
                    />
                    <RaisedButton
                      label={stepIndex === 2 ? "Finish" : "Next"}
                      primary={true}
                      onClick={this.handleNext}
                    />
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
  getUserByUserId
})(CheckoutInfo);
