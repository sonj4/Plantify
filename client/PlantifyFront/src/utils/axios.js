import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://172.16.16.199:5000/api', 
});

export default instance;
