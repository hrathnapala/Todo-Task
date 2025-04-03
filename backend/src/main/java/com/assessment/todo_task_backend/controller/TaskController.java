package com.assessment.todo_task_backend.controller;

import com.assessment.todo_task_backend.model.Task;
import com.assessment.todo_task_backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Get the 5 most recent tasks
    @GetMapping
    public List<Task> getRecentTasks() {
        return taskService.getRecentTasks();
    }

    // Mark a task as completed
    @PutMapping("/{id}/complete")
    public Task markTaskAsCompleted(@PathVariable Long id) {
        return taskService.markTaskAsCompleted(id);
    }

    // Add a new task
    @PostMapping
    public Task addTask(@RequestBody Task task) {
        return taskService.addTask(task);
    }

    // Delete a task
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}
