import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backsistemareserva.onrender.com', // URL base da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
