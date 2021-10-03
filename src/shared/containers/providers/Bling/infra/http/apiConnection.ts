import axios from 'axios';

const blingURL = process.env.BLING_API_URL;

export const blingApi = axios.create({
  baseURL: blingURL,
  timeout: 60000,
});
