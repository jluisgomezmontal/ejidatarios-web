import { Navigate } from "react-router-dom";
import {useSelector} from "react-redux";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const login = useSelector((state) => state.login.loggedIn);

    return login ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
