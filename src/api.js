
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backsistemareserva.onrender.com', // URL do seu backend hospedado no Render
});

export default api;
