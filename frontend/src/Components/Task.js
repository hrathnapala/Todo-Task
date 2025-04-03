import React from 'react';

function Task({ task, onComplete }) {
  return (
    <div className="task-card">
      <div className="left">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-description">{task.description}</p>
      </div>
      <div className="right">
        <button className="done-button" onClick={() => onComplete(task.id)}>
          Done
        </button>
      </div>
    </div>
  );
}

export default Task;
