import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

/*
The Navigation bar component: by using React Router directs
user to the other 'pages'.
*/
export class Nav extends React.Component {
  render() {
    return (
      <div className="links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tasks">Tasks</Link>
          </li>
          <li>
            <Link to="/completed">Completed</Link>
          </li>
          <li>
            <Link to="/info">Info</Link>
          </li>
        </ul>
      </div>
    );
  }
}
