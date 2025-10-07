import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/products', // Replace with our backend URL
});

export default api;

