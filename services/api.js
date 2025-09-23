import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-register-service.vercel.app/servicos',
})

export default api;