# Backend Dockerfile

# Runtime Stage 
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy built jar from bakend/target
COPY target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
