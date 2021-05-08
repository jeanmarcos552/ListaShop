import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

async function getToken() {
  return await AsyncStorage.getItem('@GoBarber:token');
}
api.defaults.headers = getToken().then((tk) => console.log(tk));

export default api;
