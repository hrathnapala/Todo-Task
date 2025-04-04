package com.assessment.todo_task_backend.controller;

import com.assessment.todo_task_backend.model.Task;
import com.assessment.todo_task_backend.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TaskControllerTest {

    @InjectMocks
    private TaskController taskController;

    @Mock
    private TaskService taskService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetRecentTasks() {
        List<Task> tasks = Arrays.asList(new Task(1L, "Task 1", "Desc 1"), new Task(2L, "Task 2", "Desc 2"));
        when(taskService.getRecentTasks()).thenReturn(tasks);

        List<Task> result = taskController.getRecentTasks();
        assertEquals(2, result.size());
        verify(taskService, times(1)).getRecentTasks();
    }

    @Test
    void testAddTask() {
        Task task = new Task(null, "New Task", "New Desc");
        Task savedTask = new Task(1L, "New Task", "New Desc");
        when(taskService.addTask(task)).thenReturn(savedTask);

        ResponseEntity<Task> response = taskController.addTask(task);
        assertEquals(201, response.getStatusCodeValue());
        assertEquals("New Task", response.getBody().getTitle());
    }

    @Test
    void testDeleteTask() {
        Long taskId = 1L;

        ResponseEntity<Void> response = taskController.deleteTask(taskId);
        assertEquals(204, response.getStatusCodeValue());
        verify(taskService, times(1)).deleteTask(taskId);
    }
}
