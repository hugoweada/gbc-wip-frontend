import axios, {type AxiosInstance} from 'axios';
import {BACKEND_URL} from './constants';

if (!BACKEND_URL) {
  throw new Error(
    'BACKEND_URL is not defined in the environment variables. Please set it in the .env file.'
  );
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 5 * 60 * 10 * 1000, // 5 minutes in milliseconds
});

export default axiosInstance;
