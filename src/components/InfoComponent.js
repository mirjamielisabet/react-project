import React from "react";
import "../App.css";

/*
Returns the Info component of the App.
Contains info about the App and provides
the instructions for using the App.
*/
export class InfoComponent extends React.Component {
  render() {
    return (
      <div className="mainComponent">
        <h2>Info</h2>
        <div className="textarea">
          <p>
            This project work is made as a part of the Frontend development
            (React) course and it uses the <i>json server</i> for implementing
            the backend.
          </p>
          <p>Copyright © Mirjami Laiho 2021</p>
        </div>
        <div className="textarea">
          <h3>How To Use the App</h3>
          <p>
            With the To Do -app you can add tasks and mark them done or undone.
            You can also edit them and rearrange them.{" "}
          </p>
          <h4>HOME</h4>
          <p>
            Home page shows tasks that are due today, both the done and the
            undone tasks. There you can mark these tasks done or delete them but
            you cannot edit them or add new tasks. If you want to do either of
            these things you have to move to the <i>Tasks</i> page.
          </p>

          <h4>TASKS</h4>
          <p>
            At the top of the Tasks page there is the <b>'Add a new Task'</b>{" "}
            area where you can add new tasks and set a due date and a tag for
            it. Adding a due date or a tag is optional.
          </p>
          <p>
            Below the 'Add a New Task' area you can see all your tasks (if you
            have any). First there is the checkbox that defines if your task is
            done or undone. If you click the checkbox and{" "}
            <b>mark the task done</b>, it moves to the <i>'Completed'</i> page.
            Then there is your description of the task and (if you have added)
            the tag and the due date.
          </p>
          <p>
            After the information about your tasks there is the <b>'Edit'</b>{" "}
            button. By clicking it, you can edit your task: edit the
            description, the due date or the tag. You can also select the
            position of your task by writing (or choosing with the arrows) the
            number that describes the tasks place on the list.{" "}
            <b>
              <i>Remember to change also the other tasks position numbers!</i>
            </b>{" "}
            For example if you have earlier given number 1 for some task (
            <i>Task1</i>), and you want another task (<i>Task2</i>) to have the
            first place, you must change both of their numbers to see the effect
            (<i>Task1 ---> 2 and Task2 ---> 1</i>). By default, the tasks do not
            have any position numbers. When you have done all your changes click{" "}
            <i>'Save Changes'</i> to save them. You can also click{" "}
            <i>'Cancel'</i> if you don't want to change anything.
          </p>

          <p>
            You can permanently <b>delete</b> your task by clicking the{" "}
            <i>'X'</i> button.
          </p>

          <p>
            After the tasklist there are the <b>sorting</b> options. (If you
            don't see them, make sure you have left the edit view by choosing
            saving or canceling!) By clicking <i>'Sort by Last Edited'</i> the
            order of the task list changes so that at the top of the list is the
            task that was last edited. By clicking <i>'Sort by Position'</i> the
            order of the task list returns to default (order by the position
            numbers defined by the user).
          </p>

          <p>
            At the bottom of the page there are the <b>Filter</b> options. You
            can filter the tasks by tag when you enter the tag's name and then
            click the <i>'Filter'</i> button. When you filter your tasks by tag,
            you can also see the done tasks that have that same tag. The
            inputted tag must be exactly the same so that it will be found! You
            can also filter the tasks by searching task by it's description. By
            entering tasks name/description on the <i>'Search a Task'</i> input
            field and then clicking <i>'Search'</i> button, you can see all the
            tasks that are like the given text (the search text does not have to
            be exact). You can see also the done tasks that match the text. By
            clicking <i>'Show All'</i> you can get back to inspecting all of
            your tasks.{" "}
          </p>

          <h4>COMPLETED</h4>
          <p>
            Completed page contains all completed tasks that haven't been
            deleted. If you click the <i>'done'</i> checkbox again, the task
            will return back to the <i>Tasks page</i>. You can't edit completed
            tasks anymore. To edit them, you should mark the task undone and
            edit it at the <i>'Tasks'</i> page or find the task by filtering
            options at the <i>'Tasks'</i> page and then edit the task.{" "}
          </p>
        </div>
      </div>
    );
  }
}
