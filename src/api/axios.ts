import axios from 'axios';

export const API_BASE_URL = 'https://assignment-front.ilevit.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
});
