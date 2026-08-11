import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ShieldCheck, AlertTriangle, Loader2, ArrowRight, RotateCcw } from 'lucide-react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

type Status = 'loading' | 'success' | 'error'

interface UserData {
  id: number
  fayda_id: string
  name: string | null
  email: string | null
  photo_url: string | null
}

export default function AuthCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState<Status>('loading')
  const [error, setError] = useState('')
  const [userData, setUserData] = useState<UserData | null>(null)

  const success = searchParams.get('success')
  const errorMsg = searchParams.get('error')

  useEffect(() => {
    if (success !== 'true') {
      setStatus('error')
      setError(errorMsg || 'Authentication failed. Please try again.')
      return
    }

    // Fetch user profile from session
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/profile`, {
          withCredentials: true,
        })
        setUserData(res.data.user)
        setStatus('success')
      } catch (err: any) {
        console.error('Failed to fetch profile:', err)
        setStatus('error')
        setError(
          err.response?.data?.error ||
          'Failed to verify your identity. Please try again.'
        )
      }
    }

    fetchProfile()
  }, [success, errorMsg])

  const handleContinue = () => {
    navigate('/complete-profile', { state: { user: userData } })
  }

  const handleRetry = () => {
    window.location.href = `${API_URL}/auth/fayda`
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-slate-50 to-white px-4">
      {/* Background accents */}
      <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-emerald-50/50 blur-3xl" />
      <div className="absolute -right-40 bottom-1/3 h-80 w-80 rounded-full bg-teal-50/40 blur-3xl" />

      <div className="relative w-full max-w-lg">
        <div className="overflow-hidden rounded-[2.5rem] border border-gray-950/80 bg-white p-1.5 shadow-2xl shadow-slate-950/6">
          <div className="rounded-4xl bg-linear-to-b from-white to-slate-50/30 p-8 sm:p-10">

            {/* Loading State */}
            {status === 'loading' && (
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-emerald-100" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-emerald-50 to-emerald-100/70">
                    <Loader2 className="h-9 w-9 animate-spin text-emerald-600" />
                  </div>
                </div>
                <h1 className="mt-8 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Verifying your identity
                </h1>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  We're connecting with Fayda to verify your National ID. This will only take a moment…
                </p>
                {/* Shimmer bar */}
                <div className="mt-8 h-1.5 w-48 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-1/3 animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full bg-linear-to-r from-emerald-400 via-teal-400 to-emerald-400" />
                </div>
              </div>
            )}

            {/* Success State */}
            {status === 'success' && userData && (
              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-emerald-50 to-emerald-100/70 shadow-lg shadow-emerald-100/50">
                  <ShieldCheck className="h-10 w-10 text-emerald-600" />
                </div>

                <h1 className="mt-8 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Identity Verified!
                </h1>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Your Fayda National ID has been verified successfully. Here's what we received:
                </p>

                {/* User Info Card */}
                <div className="mt-8 w-full rounded-3xl border border-gray-950/80 bg-linear-to-br from-slate-900 via-slate-900 to-slate-800 p-6 text-left shadow-xl shadow-slate-950/10">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">
                      Fayda Verified Data
                    </span>
                  </div>

                  {/* User Photo */}
                  {userData.photo_url && (
                    <div className="mb-5 flex justify-center">
                      <img
                        src={userData.photo_url}
                        alt={userData.name || 'User photo'}
                        className="h-20 w-20 rounded-2xl border-2 border-emerald-400/30 object-cover shadow-lg shadow-emerald-500/10"
                      />
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5">
                      <p className="text-xs font-medium text-slate-400">Full Name</p>
                      <p className="mt-1 text-base font-semibold text-white">
                        {userData.name || '—'}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5">
                      <p className="text-xs font-medium text-slate-400">Email</p>
                      <p className="mt-1 text-base font-semibold text-white">
                        {userData.email || '—'}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5">
                      <p className="text-xs font-medium text-slate-400">Fayda ID</p>
                      <p className="mt-1 font-mono text-base font-semibold text-emerald-400">
                        {userData.fayda_id}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Continue Button */}
                <button
                  type="button"
                  onClick={handleContinue}
                  className="btn-shimmer group mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-linear-to-r from-emerald-600 to-teal-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Continue Application
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>

                <p className="mt-4 text-xs text-slate-400">
                  You'll need to provide a few more details to complete your application.
                </p>
              </div>
            )}

            {/* Error State */}
            {status === 'error' && (
              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 shadow-lg shadow-red-50/50">
                  <AlertTriangle className="h-10 w-10 text-red-500" />
                </div>

                <h1 className="mt-8 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Verification Failed
                </h1>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {error}
                </p>

                {/* Error detail card */}
                <div className="mt-6 w-full rounded-2xl border border-red-200/60 bg-red-50/40 px-5 py-4 text-left">
                  <p className="text-xs font-semibold text-red-800">What you can do:</p>
                  <ul className="mt-2 space-y-1.5 text-xs leading-5 text-red-700">
                    <li>• Make sure your Fayda credentials are correct</li>
                    <li>• Check your internet connection</li>
                    <li>• Try again in a few moments</li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={handleRetry}
                  className="group mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-gray-950 bg-white px-7 py-4 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <RotateCcw className="h-4 w-4 transition-transform duration-200 group-hover:-rotate-180" />
                  Try Again
                </button>

                <a
                  href="/"
                  className="mt-4 inline-block text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-slate-700"
                >
                  ← Back to Home
                </a>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  )
}
