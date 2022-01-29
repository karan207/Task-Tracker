import { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [task, setTask] = useState("");
  const [time, setTime] = useState("");
  const [required, setRequired] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!task) {
      alert("Please Add Task");
      return;
    }

    onAdd({ task, time, required });

    setTask("");
    setTime("");
    setRequired(false);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="text"
          placeholder="Add Day & Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={required}
          value={required}
          onChange={(e) => setRequired(e.currentTarget.checked)}
        />
      </div>

      <input type="submit" className="btn btn-block" value="Save Task" />
    </form>
  );
};

export default AddTask;

