import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../../ducks/user";

class UserInfo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <button onClick={this.props.getUser}>user data</button>
        {!this.props.user ? (
          <div>Please Login first</div>
        ) : (
          <div>{this.props.user.user_email}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    loading: state.loading,
    error: state.error
  };
};

export default connect(mapStateToProps, { getUser })(UserInfo);
