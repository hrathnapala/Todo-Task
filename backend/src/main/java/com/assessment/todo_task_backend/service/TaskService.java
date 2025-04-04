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

    public List<Task> getRecentTasks() {
        return taskRepository.findTop5ByOrderByIdDesc();
    }

    public Task addTask(Task task) {
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
