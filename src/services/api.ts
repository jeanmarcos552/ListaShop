import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://listashop-api.herokuapp.com/public/api',
  timeout: 5000,
  baseURL: 'http://192.168.100.23:8080/api',
});

export function displayError(erro: any) {
  if (erro && erro.message) {
    const objError = JSON.parse(erro.message);
    if (objError && objError.data) {
      return objError;
    }
  }

  return {data: erro.message, status: 500};
}

export function mountErro(erro: any) {
  if (erro && erro.response && erro.response.data) {
    return JSON.stringify({
      data: erro.response.data || erro.message,
      status: erro.response.status,
    });
  }

  return JSON.stringify({data: String(erro.message), status: 500});
}

export default api;
