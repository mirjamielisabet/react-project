import React from "react";
import "../App.css";
const axios = require("axios");

/*
This component returns the completed tasks and allows to
permanently delete them or mark them undone.
*/
export class CompletedComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
    };
    this.getCompletedTasks = this.getCompletedTasks.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // When the 'page' first loads, this function calls the
  // getCompletedTasks function that finds all the
  // completed tasks
  componentDidMount() {
    this.getCompletedTasks();
  }

  // Empties the state's data array. Then finds the completed tasks
  // and saves the tasks to the state's data array by using axios
  getCompletedTasks() {
    this.setState({ loading: true }, () => {
      this.setState({
        data: [],
      });
      axios
        .get("/tasks?done=true")
        .then((result) => {
          this.setState({
            loading: false,
            data: result.data.concat(this.state.data),
          });
        })
        .catch((error) => {
          this.setState({
            loading: false,
            error,
          });
        });
    });
  }

  // When the user clicks the 'done' checkbox and
  // marks the task undone, this function will be
  // called. Changes the done's state to false and
  // pushes the changed data to db.json by using axios.
  // Refreshes the task list by calling the getCompletedTasks
  // function
  handleChange(tasks) {
    let id = tasks.id;
    axios
      .put(`/tasks/${id}`, {
        task: tasks.task,
        due: tasks.due,
        tag: tasks.tag,
        index: tasks.index,
        date: tasks.date,
        done: !tasks.done,
      })
      .then((res) => {
        this.getCompletedTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // When the user clicks the delete (x) button, this
  // function will be called. Finds the task with the
  // given id and deletes it from db.json by using axios.
  // Then updates the state's data array accordingly
  handleDelete(id) {
    axios
      .delete(`/tasks/${id}`)
      .then((res) => {
        this.setState((previousState) => {
          return {
            data: previousState.data.filter((d) => d.id !== id),
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Returns either the empty text area or a text area with
  // done tasks depending on the length of the state's data array.
  // Maps the state's data array, adds the 'done' checkbox and
  // delete ('X') button for every task and changes the tag's, task's and
  // due date's text style to italic.
  // If the state.loading is set to true, shows the text 'Loading'
  // instead of tasks
  render() {
    let todo = this.state.data.map((tasks, i) => {
      let id = tasks.id;
      return (
        <p key={i} className="alldata2">
          {" "}
          <input
            className="checkBox"
            type="checkbox"
            onChange={() => this.handleChange(tasks)}
            defaultChecked={tasks.done}
          ></input>
          <span
            className="tasks"
            style={{
              fontStyle: "italic",
            }}
          >
            {tasks.task}
          </span>{" "}
          <span
            className="tag"
            style={{
              fontStyle: "italic",
            }}
          >
            {tasks.tag}
          </span>{" "}
          <span
            className="due"
            style={{
              fontStyle: "italic",
            }}
          >
            {tasks.due}
          </span>{" "}
          <button
            className="deleteButton"
            onClick={() => this.handleDelete(id)}
          >
            X
          </button>
        </p>
      );
    });

    const allData = this.state.loading ? (
      <p>Loading...</p>
    ) : (
      <span>{todo}</span>
    );

    if (todo.length === 0) {
      return (
        <div className="mainComponent">
          <h2>Completed</h2>
          <div className="textarea">
            <p>Nothing To Show Here..</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mainComponent">
          <h2>Completed</h2>
          <div className="textarea">
            <h3>These tasks have been completed:</h3>
            <br />

            <div>
              <p className="headings">
                <span className="doneHeading">
                  <b>Done</b>
                </span>
                <span className="taskHeading">
                  <b>Task</b>
                </span>
                <span className="tagHeading">
                  <b>Tag</b>
                </span>
                <span className="dueHeading">
                  <b>Due</b>
                </span>
              </p>
              {allData}
              <br />
            </div>
          </div>
        </div>
      );
    }
  }
}
