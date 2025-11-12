import axios from 'axios'
import { stringify } from 'qs';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  paramsSerializer: {
    serialize: (params) => stringify(params),
  }
})

// interceptor για να στέλνει token σε κάθε request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api