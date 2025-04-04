# Todo Task Application

This is a full-stack Todo application built using **Spring Boot**, **React**, and **MySQL**. It allows users to create tasks, mark them as completed, and delete them. The backend serves a REST API, while the frontend communicates with the backend to display and manage tasks.

---

## Table of Contents
- [Backend](#backend)
  - [Getting Started](#backend-getting-started)
  - [Running the Backend](#backend-running)
  - [Endpoints](#backend-endpoints)
  - [Model Details](#backend-model-details)
  - [application.properties](#applicationproperties)
- [Frontend](#frontend)
  - [Getting Started](#frontend-getting-started)
  - [Running the Frontend](#frontend-running)
  - [App Features](#frontend-app-features)
- [Docker Setup](#docker-setup)
- [License](#license)

---

## Backend

### Overview
The backend is built with **Spring Boot** and uses **MySQL** as the database. It exposes RESTful APIs for task management and connects to the database using JPA.

### Backend Getting Started

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/todo-task-app.git
    cd todo-task-app/backend
    ```

2. **Install Dependencies**:
    ```bash
    mvn clean install
    ```

3. **Prerequisites**:
    - Java 11 or higher
    - Maven
    - MySQL or Docker

### Backend Running

1. **Using Docker**:
    ```bash
    docker-compose up --build
    ```

2. **Running Locally Without Docker**:
    ```bash
    mvn spring-boot:run
    ```

    The backend will be available at `http://localhost:8080`

### Backend Endpoints

- `GET /tasks` - Retrieve the 5 most recent tasks
- `POST /tasks` - Create a new task
- `DELETE /tasks/{id}` - Delete a task

Example Responses:

- **GET /tasks**:
  ```json
  [
    {
      "id": 1,
      "title": "Task Title",
      "description": "Task description here"
    }
  ]
  ```

- **POST /tasks**:
  ```json
  {
    "title": "New Task",
    "description": "Task description here"
  }
  ```

- **DELETE /tasks/1**:
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

### Backend Model Details

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
}
```

### application.properties

```properties
# Application name
spring.application.name=todo-task-app

# Database configuration
spring.datasource.url=jdbc:mysql://localhost:3306/tododb?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA settings
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

---

## Frontend

### Overview
The frontend is built with **React** and allows users to manage tasks through a web interface. It consumes the REST API exposed by the Spring Boot backend.

### Frontend Getting Started

1. **Navigate to the frontend folder**:
    ```bash
    cd ../frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Prerequisites**:
    - Node.js (v12 or higher)
    - npm or yarn

### Frontend Running

1. **Using Docker**:
    ```bash
    docker-compose up --build
    ```

2. **Running Locally**:
    ```bash
    npm start
    # or
    yarn start
    ```

    The app will run at `http://localhost:3000`

### Frontend App Features

- Create, delete tasks
- Responsive design for desktop and mobile
- Real-time updates to task list

---

## Docker Setup

### Requirements
- Docker
- Docker Compose

### Running Full Stack with Docker

1. **Start all services**:
    ```bash
    docker-compose up --build
    ```

2. **Stop all services**:
    ```bash
    docker-compose down
    ```

3. **Remove containers and volumes**:
    ```bash
    docker-compose down -v
    ```

### Application URLs
- Backend: `http://localhost:8080`
- Frontend: `http://localhost:3000`

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Notes
- Modify the `.env` file or `docker-compose.yml` as needed to match your environment.
- Ensure Docker and Docker Compose are installed for the easiest setup.