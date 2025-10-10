# Inventory App (Backend + Frontend) with MySQL

## Backend (Spring boot)
- Java 17, Spring Boot 3.x, Maven
- MySQL database (create `inventory_db` database)
- Update src/main/resources/application.properties with your DB credentials

To run backend:
```bash
cd backend
mvn spring-boot:run
```
Backend runs at http://localhost:8080

Uploaded images are saved under `src/main/resources/static/uploads` and served at:
`http://localhost:8080/api/products/uploads/{filename}`

## Frontend (React)
- Node 18+, npm
To run frontend:
```bash
cd frontend
npm install
npm start
```
Frontend runs at http://localhost:3000
