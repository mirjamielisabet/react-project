import React from "react";
import "../App.css";
import TodoList from "./todo-list";

/*
Returns the Task component that contains the
Todolist component. This component allows user to
add, edit or observe the tasks.
*/
export class TaskComponent extends React.Component {
  render() {
    return (
      <div className="mainComponent">
        <h2>Tasks</h2>
        <br />
        <TodoList />
      </div>
    );
  }
}
