import React, { Component } from "react";
//Material-ui
import RaisedButton from "material-ui/RaisedButton";
import ActionDelete from "material-ui/svg-icons/action/delete";
import ContentCreate from "material-ui/svg-icons/content/create";
import ContentSave from "material-ui/svg-icons/content/save";
//Sweetalert2
import swal from "sweetalert2";

class PersonalExerciseDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editName: this.props.name,
      editDescription: this.props.description,
      edit: false
    };

    this.handleEditChange = this.handleEditChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleEditChange(prop, val) {
    this.setState({ [prop]: val });
  }

  toggleEdit() {
    const { edit } = this.state;
    this.setState({
      edit: !edit
    });
  }

  handleUpdate(id, name, description) {
    const { updateEx } = this.props;
    updateEx(id, name, description);
    this.toggleEdit();
  }

  render() {
    const { removeEx, exercise } = this.props;
    const { edit, editName, editDescription } = this.state;

    return (
      <div className="personal-ex-container" key={exercise.exercise_id}>
        {!edit ? (
          <div>
            <h2 className="personal-ex-title">{exercise.name}</h2>
            <p className="personal-ex-description">
              {exercise.description
                .replace(/(<p[^>]+?>|<p>|<\/p>)/gim, "")
                .replace(/(<li[^>]+?>|<li>|<\/li>)/gim, "")
                .replace(/(<ol[^>]+?>|<ol>|<\/ol>)/gim, "")
                .replace(/(<ul[^>]+?>|<ul>|<\/ul>)/gim, "")
                .replace(/(<em[^>]+?>|<em>|<\/em>)/gim, "")
                .replace(/(<strong[^>]+?>|<strong>|<\/strong>)/gim, "")}
            </p>
            <RaisedButton
              label="Edit"
              primary={true}
              labelPosition="after"
              className="update-ex-button"
              icon={<ContentCreate />}
              onClick={this.toggleEdit}
            />
          </div>
        ) : (
          <div>
            <input
              className="add-title"
              onChange={e => this.handleEditChange("editName", e.target.value)}
              type="text"
              value={editName}
            />
            <textarea
              className="edit-ex-decription"
              onChange={e =>
                this.handleEditChange("editDescription", e.target.value)
              }
              value={editDescription}
            />
            <RaisedButton
              label="Save"
              primary={true}
              labelPosition="after"
              className="update-ex-button"
              icon={<ContentSave />}
              onClick={() => {
                this.handleUpdate(
                  exercise.exercise_id,
                  editName,
                  editDescription
                );
                swal({
                  title: `Update has been saved!`,
                  type: "success",
                  confirmButtonText: "Back to Profile",
                  confirmButtonColor: "#ff6d00"
                });
              }}
            />
          </div>
        )}

        <RaisedButton
          label="Remove"
          primary={true}
          labelPosition="after"
          className="remove-ex-button"
          icon={<ActionDelete />}
          onClick={() => {
            removeEx(exercise.exercise_id);
            swal({
              title: `Exercise has been removed!`,
              type: "success",
              confirmButtonText: "Back to Profile",
              confirmButtonColor: "#ff6d00"
            });
          }}
        />
      </div>
    );
  }
}
export default PersonalExerciseDetail;
