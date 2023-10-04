import axios from 'axios';
import refreshTokenFn, { memoizedRefreshToken } from './RefreshToken';
import RefreshToken from './RefreshToken';
import AxiosPublic from './AxiosPublic';

axios.defaults.baseURL = 'http://localhost:8000/api/';

axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      /* TODO GERER ERREUR */
      AxiosPublic.post('token/refresh', {
        refresh_token: localStorage.getItem('refresh_token'),
      })
        .then((response) => {
          localStorage.setItem('refresh_token', response.data.refresh_token);
          localStorage.setItem('token', response.data.token);

          config.headers = {
            ...config.headers,
            authorization: `Bearer ${response.data.token}`,
          };
        })
        .catch(() => {
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('token');
        });

      return axios(config);
    }
    return Promise.reject(error);
  },
);

const AxiosPrivate = axios;

export default AxiosPrivate;
