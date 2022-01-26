import axios from 'axios';
import env from '../../../config/env';

export const uploadPbCsvUser = (config, data) =>
  axios.post(`${env.API_SERVER()}/employees/update-email-user`, data, config);

