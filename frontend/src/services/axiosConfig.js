import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',  // Corrige la URL base para que apunte a /api
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
