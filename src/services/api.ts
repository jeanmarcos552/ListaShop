import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// async function getMyObject() {
//   try {
//     const jsonValue = await AsyncStorage.getItem('@GoBarber:token');
//     return jsonValue != null ? jsonValue : null;
//   } catch (e) {
//     // read error
//   }

//   console.log('Done.');
// }

export default api;
