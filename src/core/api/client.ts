import axios from 'axios';

export const API_BASE_URL = '/v1/search/shop.json';
export const api = axios.create({
  baseURL: API_BASE_URL, // 프록시 URL로 변경
});
