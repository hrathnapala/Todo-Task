package com.assessment.todo_task_backend.service;

import com.assessment.todo_task_backend.model.Task;
import com.assessment.todo_task_backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // Get the 5 most recent tasks that are not completed
    public List<Task> getRecentTasks() {
        return taskRepository.findTop5ByIsCompletedFalseOrderByCreatedAtDesc();
    }

    // Mark task as completed
    public Task markTaskAsCompleted(Long id) {
        Task task = taskRepository.findById(id).orElse(null);
        if (task != null) {
            task.setCompleted(true);
            return taskRepository.save(task);
        }
        return null;
    }

    // Create a task
    public Task addTask(Task task) {
        return taskRepository.save(task);
    }

    // Delete a task
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
