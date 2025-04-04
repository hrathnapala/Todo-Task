package com.assessment.todo_task_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Column;
import jakarta.persistence.GenerationType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
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

}