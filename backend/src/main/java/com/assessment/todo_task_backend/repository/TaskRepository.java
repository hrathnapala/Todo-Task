package com.assessment.todo_task_backend.repository;

import com.assessment.todo_task_backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
