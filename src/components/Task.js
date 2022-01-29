import { FaTimes } from "react-icons/fa";

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div className={`task ${task.required ? 'reminder' : ''} `} onDoubleClick={() => onToggle(task.id)}>
      <h3>
        {task.task}{" "}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{task.time}</p>
    </div>
  );
};

export default Task;
