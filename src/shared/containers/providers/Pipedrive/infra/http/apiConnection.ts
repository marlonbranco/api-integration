import axios from 'axios';

const pipedriveURL = process.env.PIPEDRIVE_API_URL;

export const pipedriveApi = axios.create({
  baseURL: pipedriveURL,
  timeout: 60000,
});
