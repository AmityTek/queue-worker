import React from "react";
import "../styles/globals.css";
import "../styles/animations.css";

/**
 * Props for the TasksList component.
 * - `tasks`: An array of strings representing the tasks to be displayed.
 */
interface TasksListProps {
  tasks: string[];
}

/**
 * A component to display a list of tasks.
 * - Each task is rendered as a list item with animations.
 */
function TasksList({ tasks }: TasksListProps): JSX.Element {
  return (
    <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-md">
      <ul className="results space-y-2">

        {tasks.map((task) => (
          <li
            className="result-item text-gray-800 font-medium border-b pb-2 last:border-b-0 animate-fade-in"
            key={task}
          >
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
