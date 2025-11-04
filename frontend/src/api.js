import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.ketansworkproject.space/api/products', // Replace with our backend URL
});

export default api;