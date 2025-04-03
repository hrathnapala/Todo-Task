# Project: Todo Task Application

## Overview
This is a full-stack Todo application consisting of a **Spring Boot** backend, a **React** frontend, and a **MySQL** database. It provides functionalities such as creating tasks, marking tasks as completed, and deleting tasks. The backend interacts with the database to manage tasks and expose APIs that the frontend consumes.

---

## Table of Contents
- [Backend](#backend)
  - [Getting Started](#backend-getting-started)
  - [Running the Backend](#backend-running)
  - [Endpoints](#backend-endpoints)
  - [Model Details](#backend-model-details)
- [Frontend](#frontend)
  - [Getting Started](#frontend-getting-started)
  - [Running the Frontend](#frontend-running)
  - [App Features](#frontend-app-features)
- [Docker Setup](#docker-setup)
- [License](#license)

---

## Backend

### Overview
The backend of the Todo application is built using **Spring Boot**. It serves as a RESTful API for managing tasks. The backend is connected to a **MySQL** database, where tasks are stored. The backend also includes a **TaskController** class that provides endpoints to create, retrieve, mark, and delete tasks.

### Getting Started

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/todo-task-app.git
    cd todo-task-app/backend
    ```

2. **Prerequisites**:
    - Java 11 or higher
    - Maven or Gradle
    - Docker (optional, for containerization)

3. **Install Dependencies**:
    If you're not using Docker, make sure you have Maven or Gradle installed. You can install dependencies using:
    ```bash
    mvn clean install
    ```

### Running the Backend

1. **Using Docker**:
    If you're using Docker to run the entire stack, simply run the following command:
    ```bash
    docker-compose up --build
    ```

    This will build and start the backend service, along with the database.

2. **Running Locally (without Docker)**:
    To run the Spring Boot backend locally:
    ```bash
    mvn spring-boot:run
    ```

    The backend will be available at `http://localhost:8080`.

### Endpoints

The backend provides the following endpoints:

- **GET** `/tasks` – Get the 5 most recent tasks
  - Response:
    ```json
    [
      {
        "id": 1,
        "title": "Task Title",
        "description": "Task description here",
        "isCompleted": false,
        "createdAt": "2025-04-03T10:00:00"
      }
    ]
    ```

- **PUT** `/tasks/{id}/complete` – Mark a task as completed
  - Request:
    ```json
    {
      "id": 1
    }
    ```
  - Response:
    ```json
    {
      "id": 1,
      "title": "Task Title",
      "description": "Task description here",
      "isCompleted": true,
      "createdAt": "2025-04-03T10:00:00"
    }
    ```

- **POST** `/tasks` – Add a new task
  - Request Body:
    ```json
    {
      "title": "New Task",
      "description": "Task description here"
    }
    ```
  - Response:
    ```json
    {
      "id": 1,
      "title": "New Task",
      "description": "Task description here",
      "isCompleted": false,
      "createdAt": "2025-04-03T10:00:00"
    }
    ```

- **DELETE** `/tasks/{id}` – Delete a task
  - Response:
    ```json
    {
      "message": "Task deleted successfully"
    }
    ```

---

### Backend Model Details

The `Task` model is an entity that represents a task in the database.

```java
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Title is required")
    @Size(min = 1, max = 255, message = "Title must be between 1 and 255 characters")
    @Column(nullable = false, unique = true)
    private String title;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;

    @Column(name = "is_completed", nullable = false)
    private boolean isCompleted;

    @Column(name = "created_at", nullable = false, updatable = false)
    @NotNull
    private Timestamp createdAt;
}
```

- **Title**: Required and must be between 1 and 255 characters.
- **Description**: Optional but cannot exceed 500 characters.
- **Is Completed**: Boolean value indicating whether the task is completed.
- **Created At**: Timestamp indicating when the task was created.

---

## Frontend

### Overview
The frontend is built using **React**. It allows users to interact with the Todo application by adding, viewing, and managing tasks. The frontend communicates with the backend APIs to fetch, create, and delete tasks.

### Getting Started

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/hrathnapala/Todo-Task
    cd todo-task-app/frontend
    ```

2. **Prerequisites**:
    - Node.js (v12 or higher)
    - npm or yarn

3. **Install Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Frontend

1. **Using Docker**:
    To run the frontend inside a Docker container, use the following command:
    ```bash
    docker-compose up --build
    ```

2. **Running Locally**:
    To start the development server locally:
    ```bash
    npm start
    # or
    yarn start
    ```
    The frontend will be available at `http://localhost:3000`.

### App Features

- **Task Management**: Create, update, and delete tasks.
- **Responsive UI**: The app is fully responsive for mobile and desktop views.
- **Real-time Updates**: The task list is automatically updated after adding or deleting tasks.

---

## Docker Setup

### Requirements
- Docker
- Docker Compose

### Running the Application with Docker

1. **Build and Start Services**:
    To build and start the entire application stack (backend, frontend, and database):
    ```bash
    docker-compose up --build
    ```

2. **Stopping Services**:
    To stop all running services:
    ```bash
    docker-compose down
    ```

3. **Clean Volumes (optional)**:
    If you need to clear the MySQL data and rebuild the containers from scratch, use:
    ```bash
    docker-compose down -v
    ```

4. **Accessing the Application**:
    - Backend: `http://localhost:8080`
    - Frontend: `http://localhost:3000`

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Notes
- Make sure to check the `.env` file for additional environment configurations if needed.
- Ensure you have Docker and Docker Compose installed for the easiest setup.

---

# Application.properties
- spring.application.name=

- spring.datasource.url=
- spring.datasource.username=
- spring.datasource.password=
- spring.datasource.driver-class-name=

- spring.jpa.hibernate.ddl-auto=update
- spring.jpa.show-sql=true
- spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
