// src/routes/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
  const { loggedIn, user } = useSelector((state) => state.login);

  if (!loggedIn) return <Navigate to="/login" />;
  if (!user?.isAdmin) return <Navigate to="/unauthorized" />;

  return children;
};

export default AdminRoute;
