import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './admin/pages/dashboard'
import LoginAdmin from './admin/pages/login-admin'
import Monitoring from './admin/pages/monitoring'
import ManagementUser from './admin/pages/management-user'
import MasterDataCompany from './admin/pages/master-data-company'
import MasterDataDepartments from './admin/pages/master-data-departments'
import MasterDataJobPositions from './admin/pages/master-data-job-positions'
import LayoutPages from './admin/pages/LayoutPages'
import './index.css'

function App() {
  return (
    <>
      <Router>
        <main className='min-h-screen'>
          <Routes>
            <Route exact path="/" element={<Navigate to="/login" />} />
            <Route path="/admin/*" element={<LayoutPages/>}/>
            <Route path="/login" element={<LoginAdmin/>}/>
            {/* <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/data-monitoring" element={<Monitoring/>}/>
            <Route path="/data-pengguna" element={<ManagementUser/>}/>
            <Route path="/data-perusahaan" element={<MasterDataCompany/>}/>
            <Route path="/data-departemen" element={<MasterDataDepartments/>}/>
            <Route path="/data-posisi" element={<MasterDataJobPositions/>}/> */}
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
