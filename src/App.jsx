import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './admin/pages/dashboard'
import LoginAdmin from './admin/pages/login-admin'
import LoginUser from './user/pages/login-user/LoginUser'
import Monitoring from './admin/pages/monitoring'

function App() {

  return (
    <>
      <Router>
        <main className='min-h-screen'>
          <Routes>
          <Route path="/login" element={<LoginUser/>}/>
            <Route path="/login-admin" element={<LoginAdmin/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/data-monitoring" element={<Monitoring/>}/>
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
