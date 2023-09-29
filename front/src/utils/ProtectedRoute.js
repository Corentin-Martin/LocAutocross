import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ user, pro = false }) {
  if (user === null) {
    return <Navigate to="/" replace />;
  }
  if (pro) {
    if (!user.roles.includes('ROLE_PRO')) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
}

export default ProtectedRoute;
