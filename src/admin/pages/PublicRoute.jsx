import React from "react";
import useAuthStore from "../stores/useAuthStore";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user } = useAuthStore();
  if (!user) {
    return children;
  } else {
    if (user.role.name !== "User") {
      return <Navigate to={"/admin/dashboard"} replace />;
    } else {
      return <Navigate to={"/fdm-form"} replace />;
    }
  }
};

export default PublicRoute;
