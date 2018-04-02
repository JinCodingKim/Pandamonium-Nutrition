import React, { Component } from "react";
//Material-ui
import ActionDelete from "material-ui/svg-icons/action/delete";
import ContentCreate from "material-ui/svg-icons/content/create";
import ContentSave from "material-ui/svg-icons/content/save";
import NavigationCancel from "material-ui/svg-icons/navigation/cancel";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
//Sweetalert2
import swal from "sweetalert2";
//Local
import "./PersonalExerciseDetail.css";

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
            <div className="title-button-wrapper">
              <h2 className="personal-ex-title">{name}</h2>
              <div className="edit-delete-wrapper">
                <ActionDelete
                  onClick={() => {
                    swal({
                      title: `Are you sure?`,
                      text: `You will not be able to recover this exercise`,
                      type: "warning",
                      showCancelButton: true,
                      reverseButtons: true,
                      cancelButtonText: "No, keep it",
                      confirmButtonText: "Yes, delete it",
                      cancelButtonColor: "#757575",
                      confirmButtonColor: "#ff6d00"
                    }).then(result => {
                      if (result.value) {
                        this.handleRemove(id);
                      }
                    });
                  }}
                  className="delete-ex-button"
                />
                <ContentCreate
                  onClick={this.toggleEdit}
                  className="update-ex-button"
                />
              </div>
            </div>
            <p className="personal-ex-description">
              {description
                .replace(/(<p[^>]+?>|<p>|<\/p>)/gim, "")
                .replace(/(<li[^>]+?>|<li>|<\/li>)/gim, "")
                .replace(/(<ol[^>]+?>|<ol>|<\/ol>)/gim, "")
                .replace(/(<ul[^>]+?>|<ul>|<\/ul>)/gim, "")
                .replace(/(<em[^>]+?>|<em>|<\/em>)/gim, "")
                .replace(/(<strong[^>]+?>|<strong>|<\/strong>)/gim, "")}
            </p>
          </div>
        ) : (
          <div>
            <Paper className="ex-edit-content-wrapper" zDepth={1}>
              <div className="edit-text-wrapper">
                <TextField
                  type="text"
                  inputStyle={{ color: "#000000" }}
                  value={editName}
                  onChange={e =>
                    this.handleEditChange("editName", e.target.value)
                  }
                />
                <div className="edit-cancel-confirm">
                  <NavigationCancel
                    onClick={this.toggleEdit}
                    className="cancel-ex-button"
                  />
                  <ContentSave
                    onClick={() => {
                      this.handleUpdate(id, editName, editDescription);
                      swal({
                        title: `Update has been saved!`,
                        type: "success",
                        confirmButtonText: "Back to Profile",
                        confirmButtonColor: "#ff6d00"
                      });
                    }}
                    className="update-ex-button"
                  />
                </div>
              </div>
              <TextField
                type="text"
                multiLine={true}
                rows={5}
                className="edit-description"
                textareaStyle={{
                  color: "#000000",
                  border: "1px solid #BDBDBD",
                  borderRadius: "2px",
                  overFlow: "scroll"
                }}
                value={editDescription}
                onChange={e =>
                  this.handleEditChange("editDescription", e.target.value)
                }
              />
            </Paper>
          </div>
        )}
      </div>
    );
  }
}
export default PersonalExerciseDetail;
