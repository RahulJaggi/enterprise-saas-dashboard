import { httpClient } from '../../../lib/axios';

export const authService = {
  login: async (credentials: { email: string }) => {
    return httpClient.post('/auth/login', credentials);
  },
  logout: async () => {
    return httpClient.post('/auth/logout');
  },
};
