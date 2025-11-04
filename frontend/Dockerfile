# Frontend Dockerfile


FROM node:18-alpine 
WORKDIR /app

COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy application code 
COPY . .

# Build the React app 
RUN npm run build

# Install 'serve' globally to serve the build folder
RUN npm install -g serve

# Expose port 5000 
EXPOSE 5000

# Run the app using 'serve' 
CMD [ "serve", "-s", "build", "-l", "5000" ]