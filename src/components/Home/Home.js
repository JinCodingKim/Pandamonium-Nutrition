import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../../ducks/user";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <button onClick={this.props.getUser}>user data</button>
        {this.props.loading ? (
          <div>Page is Loading...</div>
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

export default connect(mapStateToProps, { getUser })(Home);
