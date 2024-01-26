import { Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import PropTypes from "prop-types";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{element}</Layout>;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
};
