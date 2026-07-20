export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.saas-enterprise.io/v1',
  TIMEOUT: 15000,
  HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};
