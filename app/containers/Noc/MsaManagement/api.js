import axios from 'axios';
import env from '../../../config/env';

export const allEmployees = (config, data) =>
  axios.post(`${env.API_SERVER()}/employees/msa`, data, config);