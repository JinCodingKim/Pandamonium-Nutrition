import React, { Component } from "react";
import axios from "axios";
import List from "./List";
import "./WorkoutList.css";

class WorkoutList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bodyPart: ""
    };

    this.filterByExercise = this.filterByExercise.bind(this);
  }

  filterByExercise(e) {
    this.setState({
      bodyPart: e.target.value
    });
  }

  render() {
    const { bodyPart } = this.state;
    return (
      <div>
        <div className="workoutContainer">
          <select
            className="filterContainer"
            value={bodyPart}
            onChange={this.filterByExercise}
          >
            <option value="">Filter By Body Part</option>
            <option value="11">Chest</option>
            <option value="12">Back</option>
            <option value="13">Shoulders</option>
            <option value="10">Abs</option>
            <option value="14">Calves</option>
            <option value="8">Arms</option>
          </select>

          <List bodyPart={bodyPart} />
        </div>
      </div>
    );
  }
}
export default WorkoutList;
