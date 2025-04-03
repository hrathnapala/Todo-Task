# Use an official Maven image to build the project
FROM maven:3.9-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml ./
RUN mvn dependency:go-offline
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Use a lightweight JRE image to run the built JAR
FROM eclipse-temurin:17-jre

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
