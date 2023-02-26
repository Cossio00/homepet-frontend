import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3010',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    }
});

export default api;