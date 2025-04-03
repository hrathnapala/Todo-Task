import React from 'react';

function Task({ task, onComplete }) {
  return (
    <div className="task-card">
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
      <button className="done-button" onClick={() => onComplete(task.id)}>
        Done
      </button>
    </div>
  );
}

export default Task;
