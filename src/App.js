import { useState, useEffect } from "react"
import {BrowserRouter as Router, Route } from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import About from "./components/About"


const App = () => {

  const [ showAddTask, setShowAddTask ] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer);
    }

    getTasks()
  }, [])

  // fetch tasks from db.json
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  }

  // for adding task
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json();
    
    setTasks([...tasks, data] );
  }

  // for delete task
  const deleteTask = async (id) => {
  
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    setTasks(tasks.filter((task) => task.id !== id));
  };


  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  }


  // toggle required
  const toggleRequired = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, required: !taskToToggle.required }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })

    const data = await res.json()


    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, required: data.required } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        
        {/* header component */}
        <Header title="Task Tracker" showAdd={showAddTask} onAdd={() => setShowAddTask(!showAddTask)} color="white"/>

        {/* add Task component */}
        {showAddTask && <AddTask onAdd={addTask} />}

        
        <Route path="/" exact render={(props) => (
          <>
            {/* tasks component */}
            {tasks.length > 0 ? (
              <Tasks tasks={tasks} onToggle={toggleRequired} onDelete={deleteTask} />
            ) : (
              "no tasks to show"
            )}
          </>
        )} />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
