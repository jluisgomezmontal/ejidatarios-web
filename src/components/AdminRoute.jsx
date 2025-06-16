// src/routes/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
  const { loggedIn } = useSelector((state) => state.login);
  const user = JSON.parse(localStorage.getItem("user"));

  console.log(user.isAdmin);
  if (!loggedIn) return <Navigate to="/login" />;
  if (!user?.isAdmin) return <Navigate to="/unauthorized" />;

  return children;
};

export default AdminRoute;
