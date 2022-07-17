import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://listashop-api.herokuapp.com/public/api',
  // timeout: 5000,
  baseURL: 'http://192.168.100.23:8080/api',
});

export default api;
