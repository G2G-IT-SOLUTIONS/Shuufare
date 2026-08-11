import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Loader2, ShieldCheck, AlertTriangle, EyeOff, Eye } from 'lucide-react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

interface LoginData {
  email: string
  password: string
}

export default function AdminLogin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setError('')

    try {
      const res = await axios.post(
        `${API_URL}/api/admin/login`,
        formData,
        { withCredentials: true }
      )

      if (res.data?.admin) {
        navigate('/admin/dashboard')
      } else {
        setError('Invalid response from server. Please try again.')
        setStatus('error')
      }
    } catch (err: any) {
      console.error('Admin login error:', err)
      setError(
        err.response?.data?.error ||
          'Login failed. Please check your credentials and try again.'
      )
      setStatus('error')
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-slate-50 to-white px-4 py-10">
      <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-emerald-50/50 blur-3xl" />
      <div className="absolute -right-40 bottom-1/3 h-80 w-80 rounded-full bg-teal-50/40 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="overflow-hidden rounded-[2.5rem] border border-gray-950/80 bg-white p-1.5 shadow-2xl shadow-slate-950/6">
          <div className="rounded-4xl bg-linear-to-b from-white to-slate-50/30 p-8 sm:p-10">

            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-slate-900 to-slate-800 shadow-lg shadow-slate-900/20">
                <ShieldCheck className="h-8 w-8 text-emerald-400" />
              </div>

              <h1 className="mt-6 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Admin Login
              </h1>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                Sign in to access the admin dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@example.com"
                    autoComplete="email"
                    required
                    className="w-full rounded-2xl border border-gray-950 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition-all duration-200 focus:border-emerald-400 focus:shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-2xl border border-gray-950 bg-white py-3.5 pl-11 pr-12 text-sm outline-none transition-all duration-200 focus:border-emerald-400 focus:shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200 hover:text-slate-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {status === 'error' && error && (
                <div className="flex items-start gap-3 rounded-2xl border border-red-200/60 bg-red-50/50 px-5 py-4">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-shimmer group mt-2 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-linear-to-r from-emerald-600 to-teal-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:pointer-events-none disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign in
                    <ShieldCheck className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-400">
              Authorized personnel only.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
