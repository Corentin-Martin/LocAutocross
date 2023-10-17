import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import AxiosPrivate from './AxiosPrivate';
import { setUser } from '../actions/user';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

function ProtectedRoute({ pro = false }) {
  const [localUser, setLocalUser] = useState(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setIsLoading(false);
    }
    else {
      AxiosPrivate.get('user')
        .then((response) => {
          dispatch(setUser(response.data));
          setLocalUser(response.data);
          setIsLoading(false);
        }).catch((error) => {
          console.error(error);
        });
    }
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (localUser === null) {
    return <Navigate to="/" replace />;
  }
  if (pro) {
    if (!localUser.roles.includes('ROLE_PRO')) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
}

export default ProtectedRoute;
