import axios from 'axios';
import RefreshToken from './RefreshToken';

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}api/`;

axios.interceptors.response.use(
  (response) => {
    if (response.status === 204) {
      return Promise.resolve({
        ...response,
        data: undefined,
      });
    }
    return response;
  },
  (error) => Promise.reject(error),

);

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
      try {
        const newToken = await RefreshToken();

        if (newToken) {
          config.headers = {
            ...config.headers,
            authorization: `Bearer ${newToken}`,
          };
        }

        return axios(config);
      }
      catch (refreshError) {
        console.error('Erreur lors du rafraîchissement du token :', refreshError);
      }
    }
    return Promise.reject(error);
  },
);

const AxiosPrivate = axios;

export default AxiosPrivate;
