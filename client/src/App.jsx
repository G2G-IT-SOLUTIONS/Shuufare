import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import ApplicationStatus from './pages/ApplicationStatus'
import AuthCallback from './pages/AuthCallback'
import CompleteProfile from './pages/CompleteProfile'
import AdminLogin from './admin/login'

const AppContent = () => {
  const location = useLocation()

  const isAdminPage = location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen bg-white text-slate-950">
      {!isAdminPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/application-status" element={<ApplicationStatus />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App