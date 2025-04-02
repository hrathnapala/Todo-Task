package com.assessment.todo_task_backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Data // Generates getters, setters, toString, equals, and hashCode methods
@NoArgsConstructor // Generates a no-args constructor
@AllArgsConstructor // Generates a constructor with all fields
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Title is required") // Not null constraint
    @Size(min = 1, max = 255, message = "Title must be between 1 and 255 characters") // Length constraint
    @Column(nullable = false, unique = true) // Column-level constraints
    private String title;

    @Size(max = 500, message = "Description cannot exceed 500 characters") // Length constraint
    private String description;

    @Column(name = "is_completed", nullable = false)
    private boolean isCompleted;

    @Column(name = "created_at", nullable = false, updatable = false)
    @NotNull
    private Timestamp createdAt;
}