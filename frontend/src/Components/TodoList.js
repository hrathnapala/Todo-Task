import React from 'react';
import Task from './Task';

function TodoList({ tasks, onComplete }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <Task key={task.id} task={task} onComplete={onComplete} />
      ))}
    </div>
  );
}

export default TodoList;
