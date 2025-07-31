import axios from 'axios';

// const BASE_URL = 'https://task-manager-mern-app-dj9e.onrender.com/api/notes';
// const BASE_URL = 'http://localhost:3800/api/notes'
 const BASE_URL = 'https://mern-dup-1.onrender.com'

export const api = axios.create({
  baseURL: BASE_URL,
   withCredentials: true, 
});
