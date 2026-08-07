import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import ApplicationStatus from './pages/ApplicationStatus'
const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-slate-950">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/application-status" element={<ApplicationStatus />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App