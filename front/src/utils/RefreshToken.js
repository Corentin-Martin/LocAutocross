import mem from 'mem';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AxiosPublic from './AxiosPublic';
import { setToken } from '../actions/user';

function RefreshToken() {
  const [newToken, setNewToken] = useState(null);
  useEffect(() => {
    AxiosPublic.post('token/refresh', {
      refresh_token: localStorage.getItem('refresh_token'),
    })
      .then((response) => {
        localStorage.setItem('refresh_token', response.data.refresh_token);
        localStorage.setItem('token', response.data.token);
        setNewToken(response.data.token);
      })
      .catch(() => {
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('token');
      });
  }, []);

  return newToken;
}

export default RefreshToken;
// const refreshTokenFn = async () => {
//   AxiosPublic.post('token/refresh', {
//     refresh_token: localStorage.getItem('refresh_token'),
//   })
//     .then((response) => {
//       localStorage.setItem('refresh_token', response.data.refresh_token);
//       localStorage.setItem('token', response.data.token);
//     })
//     .catch(() => {
//       localStorage.removeItem('refresh_token');
//       localStorage.removeItem('token');
//     });
//   return response.data.token;
// };

// export default refreshTokenFn;
