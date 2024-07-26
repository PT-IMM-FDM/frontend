import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LayoutPages from "./admin/pages/LayoutPages";
import "./index.css";
import Login from "./admin/pages/login-admin";
import useAuthStore from "./admin/stores/useAuthStore";
import { getCurrentLogin } from "./admin/api/auth";
import ProtectedRoute from "./admin/pages/ProtectedRoute";
import NotFound from "./admin/pages/NotFound";
import FDM from "./user/pages/FDM-user/FDMForm";
import PublicRoute from "./admin/pages/PublicRoute";

function App() {
  const { token, setUser } = useAuthStore((state) => ({
    token: state.token,
    setUser: state.setUser,
  }));

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const dataUser = await getCurrentLogin(token);
          setUser(dataUser);
        } catch (error) {
          console.error("Error fetching current user:", error);
        }
      }
    };

    fetchUser();
  }, [token, setUser]);

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Navigate to={token ? '/admin/dashboard' : '/login'} />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/admin/dashboard" replace />} /> */}
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route element={<ProtectedRoute allowedRoles={["Admin", "Viewer"]} />}>
          <Route path="/admin/*" element={<LayoutPages />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["User"]} />}>
          <Route path="/FDM-form" element={<FDM />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
