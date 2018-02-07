import React, { Component } from "react";
//Material-ui
import RaisedButton from "material-ui/RaisedButton";
import ActionDelete from "material-ui/svg-icons/action/delete";
import ContentCreate from "material-ui/svg-icons/content/create";
import ContentSave from "material-ui/svg-icons/content/save";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
//Sweetalert2
import swal from "sweetalert2";
//Local
import "./../PersonalExercises.css";

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
    this.handleRemove = this.handleRemove.bind(this);
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

  handleRemove(id) {
    const { removeEx } = this.props;
    removeEx(id);
  }

  render() {
    const { name, description, id } = this.props;
    const { edit, editName, editDescription } = this.state;

    return (
      <div className="personal-ex-container">
        {!edit ? (
          <div>
            <h2 className="personal-ex-title">{name}</h2>
            <p className="personal-ex-description">
              {description
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
            <Paper className="ex-edit-content-wrapper" zDepth={1}>
              <TextField
                type="text"
                inputStyle={{ color: "#000000" }}
                value={editName}
                onChange={e =>
                  this.handleEditChange("editName", e.target.value)
                }
              />
              <TextField
                type="text"
                multiLine={true}
                rows={5}
                textareaStyle={{
                  color: "#000000",
                  border: "1px solid #BDBDBD",
                  borderRadius: "2px",
                  overFlow: "scroll"
                }}
                value={editDescription}
                onChange={e =>
                  this.handleAddChange("editDescription", e.target.value)
                }
              />
            </Paper>
            <RaisedButton
              label="Save"
              primary={true}
              labelPosition="after"
              className="update-ex-button"
              icon={<ContentSave />}
              onClick={() => {
                this.handleUpdate(id, editName, editDescription);
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
            this.handleRemove(id);
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
