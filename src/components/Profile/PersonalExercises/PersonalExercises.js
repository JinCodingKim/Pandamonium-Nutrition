import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import { getUserExercises } from "../../../ducks/workout";
//Local
import "./UserInfo.css";

class UserInfo extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { user, getUserExercises } = this.props;
    getUserExercises(user.user_id);
  }
  render() {
    const { userExercises = [], loading } = this.props;
    return <div className="peronal-exercises-wrapper" />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    userExercises: state.workout.userExercises
  };
};

export default connect(mapStateToProps, { getUserExercises })(UserInfo);
