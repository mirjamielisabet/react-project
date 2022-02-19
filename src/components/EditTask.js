import axios from "axios";
import React from "react";
import "../App.css";

/*
Returns the form component that allows the user to edit a task.
Uses axios for pushing the changes to the db.json file.
*/
class EditTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: this.props.tasks.task,
      due: this.props.tasks.due,
      done: this.props.tasks.done,
      index: this.props.tasks.index,
      tag: this.props.tasks.tag,
    };
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
  }

  // Handles the change in the input fields and saves the
  // input to the state
  handleEditChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  // When the 'Save Changes' button is clicked this function is called:
  // Puts the inputted information to the db.json file by using axios and
  // json server. When done, calls the 'getData' function to refresh the page
  // and sets editing to false.
  handleEditSubmit(event) {
    event.preventDefault();
    axios
      .put(`http://localhost:3010/tasks/${this.props.tasks.id}`, {
        task: this.state.task,
        due: this.state.due,
        tag: this.state.tag,
        done: this.state.done,
        index: this.state.index,
        date: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
      })
      .then((resp) => {
        this.props.getData();
        this.props.setEditingFalse();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Returns the form with input fields, 'Save Changes' and 'Cancel'
  // buttons. By clicking the 'Cancel' button the editing will be set to false.
  render() {
    return (
      <form className="form" onSubmit={this.handleEditSubmit}>
        <h3>Edit a Task</h3>
        <label>
          Edit Task:
          <input
            name="task"
            type="text"
            value={this.state.task}
            onChange={this.handleEditChange}
          ></input>
        </label>
        <label>
          Edit Due:
          <input
            name="due"
            type="date"
            value={this.state.due}
            onChange={this.handleEditChange}
          ></input>
        </label>
        <label>
          Edit Tag:
          <input
            name="tag"
            type="text"
            value={this.state.tag}
            onChange={this.handleEditChange}
          ></input>
        </label>
        <label>
          Position:
          <input
            name="index"
            type="number"
            min="1"
            max={this.props.arraySize + 1}
            value={this.state.index}
            onChange={this.handleEditChange}
          ></input>
        </label>
        <button className="button" type="submit">
          Save Changes
        </button>
        <button
          className="cancelBtn"
          onClick={() => this.props.setEditingFalse()}
        >
          Cancel
        </button>
      </form>
    );
  }
}

export default EditTodo;
