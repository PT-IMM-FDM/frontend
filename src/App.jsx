import FDM from "./user/pages/FDM-user/FDMForm";
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './admin/pages/dashboard'
import LoginAdmin from './admin/pages/login-admin'
import Monitoring from './admin/pages/monitoring'
import ManagementUser from './admin/pages/management-user'

function App() {
  return (
    <>
      <Router>
        <main className="min-h-screen">
          <Routes>
            <Route path="/FDM-form" element={<FDM />} />
            <Route path="/login" element={<LoginAdmin/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/data-monitoring" element={<Monitoring/>}/>
            <Route path="/data-pengguna" element={<ManagementUser/>}/>
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
