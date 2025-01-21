import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminRoutes from "./admin/pages/AdminRoutes";
import "./index.css";
import Login from "./admin/pages/login-admin";
import useAuthStore from "./admin/stores/useAuthStore";
import { getCurrentLogin } from "./admin/api/auth";
import ProtectedRoute from "./admin/pages/ProtectedRoute";
import NotFound from "./admin/pages/NotFound";
import FDM from "./user/pages/FDM-user/FDMForm";
import PublicRoute from "./admin/pages/PublicRoute";
import HistoryU from "./user/pages/History-user/HistoryU";
import ResultU from "./user/pages/Result-user/ResultU";
import ManageUser from "./user/pages/Manage-user/Manage-user";

function App() {
  const { token, setUser } = useAuthStore((state) => ({
    token: state.token,
    setUser: state.setUser,
  }));

  useEffect(() => {
    // Fetch user data if token exists
    const fetchUser = async () => {
      if (token) {
        try {
          const dataUser = await getCurrentLogin(token);
          setUser(dataUser.data);
        } catch (error) {
          console.error("Error fetching current user:", error);
        }
      }
    };

    fetchUser();

    // Visibility change logic for auto-reload
    let lastHiddenTime = null;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Simpan waktu terakhir tab menjadi tidak aktif
        lastHiddenTime = new Date();
      } else if (document.visibilityState === "visible") {
        // Hitung waktu tab tidak aktif
        if (lastHiddenTime) {
          const now = new Date();
          const timeAway = (now - lastHiddenTime) / 1000; // dalam detik
          console.log(`Tab diakses kembali setelah ${timeAway} detik.`);
          if (timeAway > 600) {
            console.log("Reloading page...");
            window.location.reload(); // Reload halaman
          }
        }
      }
    };

    // Tambahkan event listener untuk visibilitychange
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [token, setUser]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          element={
            <ProtectedRoute allowedRoles={["Admin", "Full Viewer", "Viewer"]} />
          }>
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Route>
        <Route
          element={
            <ProtectedRoute
              allowedRoles={["User", "Admin", "Viewer", "Full Viewer"]}
            />
          }>
          <Route path="/fdm-form" element={<FDM />} />
          <Route path="/fdm-form/hasil" element={<ResultU />} />
          <Route path="/riwayat-user" element={<HistoryU />} />
          <Route path="/profile" element={<ManageUser />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
