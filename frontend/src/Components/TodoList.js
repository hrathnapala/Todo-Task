import React from 'react';
import Task from './Task';

function TodoList({ tasks, onDelete }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default TodoList;
