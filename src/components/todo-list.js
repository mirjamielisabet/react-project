import React from "react";
import "../App.css";
import AddTodo from "./Addtodo";
import EditTodo from "./EditTask";
const axios = require("axios");

/*
Returns the Todolist component that includes
the tasks, the forms for adding or editing tasks,
and the possibilities for filtering, sorting or
deleting tasks.
*/
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      editing: false,
      editingTasks: [],
      tag: "",
      text: "",
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.setEditingFalse = this.setEditingFalse.bind(this);
    this.getDataByTag = this.getDataByTag.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.search = this.search.bind(this);
    this.sortData = this.sortData.bind(this);
  }

  // When the 'page' first loads, this function calls the
  // getData function that finds all tasks that are undone
  componentDidMount() {
    this.getData();
  }

  // Sets tag and text input fields empty (filtering options),
  // and empties the data array before fetching new data.
  // Finds all undone tasks sorted by index by using axios.
  // Saves the data to the state's data array
  getData() {
    this.setState({ loading: true }, () => {
      this.setState({
        data: [],
        tag: "",
        text: "",
      });
      axios
        .get("/tasks?_sort=index&done=false")
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

  // First empties the data array and text (Search) input field,
  // then finds all data that match the given tag and saves it
  // to the state's data array
  getDataByTag() {
    this.setState({ loading: true }, () => {
      this.setState({
        data: [],
        text: "",
      });
      axios
        .get(`/tasks?tag=${this.state.tag}`)
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

  // Handles the change in the tag filtering option's
  // input field and saves the input to the state's tag
  handleTagChange(event) {
    this.setState({ tag: event.target.value });
  }

  // Deletes the task with given id by using axios and
  // updates the changes to the state's data array
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

  // When the user clicks the 'done' checkbox and
  // marks the task undone/done, this function will be
  // called. Changes the done's state to false or true and
  // pushes the changed data to db.json by using axios.
  // Then calls the getData function to refresh the task list
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
      .then(() => {
        this.getData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // When user clicks the Edit button, this function will
  // be called. Sets editing to true and saves the tasks
  // that will be edited to editingTasks
  handleEdit(tasks) {
    this.setState({ editing: true, editingTasks: tasks });
  }

  // When user is done editing, this function will be called:
  // sets editing to false
  setEditingFalse() {
    this.setState({ editing: false });
  }

  // Handles the change in the input field of Search
  // a Task. Saves the input to the state's text
  handleTextChange(event) {
    this.setState({ text: event.target.value });
  }

  // When the Search's input is submitted, this function
  // will be called. First empties the state's data array and
  // tag input field. Then by using axios, finds all tasks of which
  // description is like the inputted text. Saves the found data to
  // the state's data array
  search() {
    this.setState({ loading: true }, () => {
      this.setState({
        data: [],
        tag: "",
      });
      axios
        .get(`/tasks?task_like=${this.state.text}`)
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

  // When the 'Sort by Last Edited' button is clicked, this
  // function is called. First the function empties the state's
  // data array. Then it finds all the undone tasks and sorts them
  // by the last edited date so that the task that was last edited
  // is at the top of the list. Saves the data to the state's data
  // array
  sortData() {
    this.setState({ loading: true }, () => {
      this.setState({
        data: [],
      });
      axios
        .get("/tasks?_sort=date&_order=desc&done=false")
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

  // Maps the state's data array and returns every task with
  // its info and the 'Done' checkbox, the 'Edit' button and the
  // delete ('X') button. The task, due date and tag have the 'line-through'
  // text decoration if the task is done (done tasks might be visible if
  // the filters are used).
  // If the loading is true, shows text 'loading', and if the state's data
  // array is empty, shows the info about not finding any tasks. If editing
  // is true: shows the view with 'Edit a Task' form, and the task list. If
  // editing is false: shows the view with the 'Add a Task' form and the task list,
  // sorting options and filtering options.
  render() {
    let todo = this.state.data.map((tasks, i) => {
      let id = tasks.id;
      return (
        <p key={i} className="alldata">
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
          <button className="edit" onClick={() => this.handleEdit(tasks)}>
            Edit
          </button>
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
        <div>
          <AddTodo getData={this.getData} index={todo.length} />
          <div className="textarea">
            <p>Nothing Found!</p>
            <p>
              Either your filtering/searching didn't find any results or you
              don't have anything To Do!
            </p>
            <p>
              If it's the first case click this button to get back to your
              todos: <br />
              <br />
              <button className="button" onClick={this.getData}>
                Show All
              </button>
            </p>
          </div>
        </div>
      );
    } else if (this.state.editing) {
      return (
        <div>
          <EditTodo
            setEditingFalse={this.setEditingFalse}
            tasks={this.state.editingTasks}
            getData={this.getData}
            arraySize={todo.length}
          />
          <div className="textarea">
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
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <AddTodo getData={this.getData} />

          <div className="textarea">
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
            <button className="button" onClick={this.sortData}>
              Sort by Last Edited
            </button>{" "}
            <button className="button" onClick={this.getData}>
              Sort by Position
            </button>{" "}
            <br />
            <br />
            <h3>Filters</h3>
            <button className="button" onClick={this.getData}>
              Show All
            </button>
            <br />
            <br />
            <form onSubmit={this.getDataByTag}>
              Filter by Tag:{" "}
              <input
                type="text"
                name="tag"
                placeholder="Type a tag to search"
                value={this.state.tag}
                onChange={this.handleTagChange}
                required
              ></input>{" "}
              <button className="button" type="submit">
                Filter
              </button>
            </form>
            <br />
            <form onSubmit={this.search}>
              Search a Task:{" "}
              <input
                type="text"
                value={this.state.text}
                placeholder="Type something to search"
                onChange={this.handleTextChange}
                required
              ></input>{" "}
              <button className="button" type="submit">
                Search
              </button>
            </form>
            <br />
          </div>
        </div>
      );
    }
  }
}

export default TodoList;
