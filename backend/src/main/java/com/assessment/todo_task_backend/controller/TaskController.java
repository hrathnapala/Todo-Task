package com.assessment.todo_task_backend.controller;

import com.assessment.todo_task_backend.model.Task;
import com.assessment.todo_task_backend.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getRecentTasks() {
        return taskService.getRecentTasks();
    }

    @PostMapping
    public ResponseEntity<Task> addTask(@Valid @RequestBody Task task) {
        Task addedTask = taskService.addTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
