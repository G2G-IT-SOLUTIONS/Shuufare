import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import ApplicationStatus from './pages/ApplicationStatus'
import AuthCallback from './pages/AuthCallback'
import CompleteProfile from './pages/CompleteProfile'

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-slate-950">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/application-status" element={<ApplicationStatus />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App