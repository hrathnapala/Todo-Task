package com.assessment.todo_task_backend.repository;

import com.assessment.todo_task_backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findTop5ByIsCompletedFalseOrderByCreatedAtDesc();
}
