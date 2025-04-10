import { useEffect } from "react";
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
import PublicRoute from "./admin/pages/PublicRoute";
import HistoryU from "./user/pages/History-user/HistoryU";
import ResultU from "./user/pages/Result-user/ResultU";
import ManageUser from "./user/pages/Manage-user/Manage-user";
import FDMForm from "./user/pages/FDM-user/FDMForm";

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

          // Hapus token dari Zustand (atau Redux) saat gagal mengambil user
          useAuthStore.setState({ token: null, user: null });

          // Redirect ke login
          window.location.replace("/login");
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
          if (timeAway > 900) {
            window.location.reload(); // Reload halaman ketika sudah 10 menit tab tertutup
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
          <Route path="/fdm-form" element={<FDMForm />} />
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
