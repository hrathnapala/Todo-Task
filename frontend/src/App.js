import React, { useState, useEffect, useCallback } from 'react';
import {TodoList} from './components';
import { ToastContainer, toast } from 'react-toastify';
import debounce from 'lodash/debounce';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { getTasks, addTask as addTaskAPI, deleteTask } from './services/taskService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      toast.error('Failed to load tasks');
    }
  };

  const addTask = async () => {
    if (!newTask.title || !newTask.description) return;

    setIsSubmitting(true);

    try {
      await addTaskAPI({
        title: newTask.title,
        description: newTask.description,
      });
      fetchTasks();
      setNewTask({ title: '', description: '' });
      toast.success('Task added');
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || 'Failed to add task');
      } else {
        toast.error('Something went wrong');
      }
    }

    setIsSubmitting(false);
  };

  const debouncedAddTask = useCallback(debounce(addTask, 800), [newTask]);

  const handleAddClick = () => {
    debouncedAddTask();
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
      toast.success('Task deleted');
    } catch (error) {
      toast.error('Failed to delete task');
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
          <textarea
            placeholder="Description"
            className="description-textarea"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <button
            className={`add-button ${isSubmitting ? 'loading' : ''}`}
            onClick={handleAddClick}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>

      <div className="vertical-line"></div>

      <div className="right-container">
        <TodoList tasks={tasks} onDelete={handleDeleteTask} />
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default App;
