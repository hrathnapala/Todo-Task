import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './Components/TodoList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const BASE_URL = 'http://localhost:8080/tasks';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async () => {
    if (newTask.title && newTask.description) {
      try {
        const response = await axios.post(BASE_URL, {
          title: newTask.title,
          description: newTask.description,
          isCompleted: false,
          createdAt: new Date().toISOString(),
        });
        
        // Fetch the latest tasks again after adding the new task
        fetchTasks();
        setNewTask({ title: '', description: '' });
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };
  

  const handleCompleteTask = async (id) => {
    try {
      await axios.put(`${BASE_URL}/${id}/complete`);
      fetchTasks();
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  return (
    <div className="app-container">
      <div className="left-container">
        <div className="add-task">
          <h2>Add a Task</h2>
          <input
            type="text"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <button className="add-button" onClick={handleAddTask}>
            Add
          </button>
        </div>
      </div>

      <div className="vertical-line"></div>

      <div className="right-container">
        <TodoList tasks={tasks} onComplete={handleCompleteTask} />
      </div>
    </div>
  );
}

export default App;
