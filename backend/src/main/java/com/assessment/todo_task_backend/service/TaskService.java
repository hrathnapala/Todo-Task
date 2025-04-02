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
        List<Task> tasks = taskRepository.findAll();
        tasks.removeIf(Task::isCompleted);  // Remove completed tasks
        return tasks.stream()
                .limit(5)  // Limit to the 5 most recent tasks
                .toList();
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
