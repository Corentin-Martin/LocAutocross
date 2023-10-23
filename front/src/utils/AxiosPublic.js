import axios from 'axios';

const AxiosPublic = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

AxiosPublic.interceptors.response.use(
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

export default AxiosPublic;
