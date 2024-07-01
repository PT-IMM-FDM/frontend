import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './admin/pages/Dashboard'
import LoginAdmin from './admin/pages/LoginAdmin'

function App() {

  return (
    <>
      <Router>
        <main className='min-h-screen'>
          <Routes>
            <Route path="/login-admin" element={<LoginAdmin/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
