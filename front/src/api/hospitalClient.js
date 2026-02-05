import axios from 'axios';

const hospitalApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_HOSPITAL_API_KEY
  }
});

export default hospitalApi;
