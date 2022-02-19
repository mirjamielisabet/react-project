import React from "react";
import "../App.css";
const axios = require("axios");

/*
This component returns the main page (home page) of the application. Here
user can see the tasks that are due today (done or undone tasks) and allows to
permanently delete them or mark them done/undone.
*/
export class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
    };
    this.getTasks = this.getTasks.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // When the 'page' first loads, this function calls the
  // getTasks function that finds all tasks that are
  // due today
  componentDidMount() {
    this.getTasks();
  }

  // Finds all tasks that are due today and
  // then saves them to the state's data array
  getTasks() {
    var date = new Date().toJSON().slice(0, 10);
    this.setState({ loading: true }, () => {
      this.setState({
        data: [],
      });
      axios
        .get(`http://localhost:3010/tasks?due=${date}`)
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
  // marks the task undone/done, this function will be
  // called. Changes the done's state to false or true and
  // pushes the changed data to db.json by using axios.
  // Then refreshes the task list by calling getTasks function
  handleChange(tasks) {
    let id = tasks.id;
    axios
      .put(`http://localhost:3010/tasks/${id}`, {
        task: tasks.task,
        due: tasks.due,
        tag: tasks.tag,
        index: tasks.index,
        date: tasks.date,
        done: !tasks.done,
      })
      .then(() => {
        this.getTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // When the user clicks the delete ('X') button, this
  // function will be called. Finds the task with the
  // given id and deletes it from db.json by using axios.
  // Then changes the state's data array accordingly
  handleDelete(id) {
    axios
      .delete(`http://localhost:3010/tasks/${id}`)
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
  // tasks depending on the length of the state's data array.
  // Maps the state's data array and changes the tag's, task's and
  // due date's text style according to the value of the tasks.done.
  // Adds the 'done' checkbox and delete ('X') button for every task.
  // If the state.loading is set to true, shows the text 'Loading'
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
              textDecoration: tasks.done ? "line-through" : "none",
            }}
          >
            {tasks.task}
          </span>{" "}
          <span
            className="tag"
            style={{
              textDecoration: tasks.done ? "line-through" : "none",
            }}
          >
            {tasks.tag}
          </span>{" "}
          <span
            className="due"
            style={{
              textDecoration: tasks.done ? "line-through" : "none",
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
          <h2>Home</h2>
          <div className="textarea">
            <p>You don't have any tasks that are due today!</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mainComponent">
          <h2>Home</h2>
          <div className="textarea">
            <div>
              <h3>These Tasks are due Today!</h3>
              <br />
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
