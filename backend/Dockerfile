# Backend Dockerfile

#Build Stage
FROM maven:3.9.5-eclipse-temurin-17 AS builder
WORKDIR /app

# Copy pom.xml to caching dependencies
COPY pom.xml .

# Copy source code
COPY src ./src

# Build application 
RUN mvn package


# Runtime Stage 
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy built jar from builder
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
