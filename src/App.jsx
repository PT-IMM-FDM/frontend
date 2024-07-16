import FDM from "./user/pages/FDM-user/FDMForm";
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './admin/pages/dashboard'
import LoginAdmin from './admin/pages/login-admin'
import Monitoring from './admin/pages/monitoring'
import ManagementUser from './admin/pages/management-user'
import HistoryU from "./user/pages/History-user/HistoryU";
import ResultU from "./user/pages/Result-user/ResultU";


function App() {
  return (
    <>
      <Router>
        <main className="min-h-screen">
          <Routes>
            <Route exact path="/" element={<Navigate to="/login"/>} />
            <Route path="/fdm-form" element={<FDM />} />
            <Route path="/login" element={<LoginAdmin/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/data-monitoring" element={<Monitoring/>}/>
            <Route path="/data-pengguna" element={<ManagementUser/>}/>
            <Route path="/riwayat-user" element= {<HistoryU/>}/>
            <Route path="/hasil" element= {<ResultU/>}/>
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
