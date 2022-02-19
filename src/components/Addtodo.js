import axios from "axios";
import React from "react";
import "../App.css";

/*
Returns the form component that allows the user to add new tasks.
Uses axios for posting the new task to the db.json file.
*/
class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      due: "",
      tag: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Handles the change in the input fields and saves the
  // input to the state
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  // When user clicks the 'Add' button this function is called:
  // Posts the added task and its info to the db.json file by using axios
  // and json server. When done, calls the 'getData' function to
  // refresh the page and empties the values of the input fields.
  handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3010/tasks", {
        task: this.state.task,
        due: this.state.due,
        tag: this.state.tag,
        done: false,
        date: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
      })
      .then(() => {
        this.props.getData();
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({ task: "", due: "", tag: "" });
  }

  // Returns the form component with the input fields and the 'Add' button
  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h3>Add a new Task</h3>
        <label>
          Task:
          <input
            name="task"
            type="text"
            placeholder="Enter a task"
            value={this.state.task}
            onChange={this.handleChange}
            required
          ></input>
        </label>
        <label>
          Due:
          <input
            name="due"
            type="date"
            value={this.state.due}
            onChange={this.handleChange}
          ></input>
        </label>
        <label>
          Tag:
          <input
            name="tag"
            type="text"
            placeholder="Enter a tag"
            value={this.state.tag}
            onChange={this.handleChange}
          ></input>
        </label>
        <button className="button" type="submit">
          Add
        </button>
      </form>
    );
  }
}

export default AddTodo;
