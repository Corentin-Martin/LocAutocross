import AxiosPublic from './AxiosPublic';

// eslint-disable-next-line consistent-return
const RefreshToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');

  try {
    const response = await AxiosPublic.post('/token/refresh', {
      refresh_token: refreshToken,
    });

    if (!response.data.token) {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
    }

    localStorage.setItem('refresh_token', response.data.refresh_token);
    localStorage.setItem('token', response.data.token);

    return response.data.token;
  }
  catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
  }
};

export default RefreshToken;
