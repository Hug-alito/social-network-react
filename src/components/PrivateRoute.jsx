import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from '../utils/auth';

const PrivateRoute = () => {
  return checkAuth() ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" />
  );
};

export default PrivateRoute;