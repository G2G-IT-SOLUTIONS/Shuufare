import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ShieldCheck, AlertTriangle, Loader2, ArrowRight, RotateCcw } from 'lucide-react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

const API_URL = import.meta.env.VITE_API_URL;
type Status = 'loading' | 'success' | 'error'
interface UserData {
  id: number
  fayda_id: string
  name: string | null
  email: string | null
  photo_url: string | null
  gender?: string | null
birthdate?: string | null
  nationality?: string | null
  address?: string | null
}
interface FormData {
  phoneNumber: string
  alternativePhone: string
  currentLocation: string
  age: string
  drivingLicense: string
  currentlyEmployed: string
  previousExperience: string
  accessibilityConsiderations: string
  goals: string
  howDidYouHear: string
}

export default function AuthCallback() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState<Status>('loading')
  const [error, setError] = useState('')
  const [userData, setUserData] = useState<UserData | null>(null)
  const [formData, setFormData] = useState<FormData>({
    phoneNumber: '',
    alternativePhone: '',
    currentLocation: '',
    age: '',
    drivingLicense: '',
    currentlyEmployed: '',
    previousExperience: '',
    accessibilityConsiderations: '',
    goals: 'stable_income',
    howDidYouHear: 'telegram'
  })

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

        console.log('Fetched user profile:', res.data.user);


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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post(`${API_URL}/driver/application`, {
        ...formData,
        userId: userData?.id
      }, { withCredentials: true })
      navigate('/success')
    } catch (err: any) {
      console.error('Failed to submit application:', err)
      setError(err.response?.data?.error || 'Failed to submit application')
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-slate-50 to-white px-4">
      {/* Background accents */}
      <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-amber-50/50 blur-3xl" />
      <div className="absolute -right-40 bottom-1/3 h-80 w-80 rounded-full bg-amber-50/40 blur-3xl" />

      <div className="relative w-full max-w-lg">
        <div className="overflow-hidden rounded-[2.5rem] border border-gray-950/80 bg-white p-1.5 shadow-2xl shadow-slate-950/6">
          <div className="rounded-4xl bg-linear-to-b from-white to-slate-50/30 p-8 sm:p-10">

            {/* Loading State */}
            {status === 'loading' && (
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-amber-100" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-amber-50 to-amber-100/70">
                    <Loader2 className="h-9 w-9 animate-spin text-amber-600" />
                  </div>
                </div>
                <h1 className="mt-8 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  {t('authCallback.verifyingIdentity')}
                </h1>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {t('authCallback.verifyingDescription')}
                </p>
                {/* Shimmer bar */}
                <div className="mt-8 h-1.5 w-48 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-1/3 animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full bg-linear-to-r from-emerald-400 via-teal-400 to-emerald-400" />
                </div>
              </div>
            )}

            {/* Success State */}
            {status === 'success' && userData && (
              <div className="max-h-[70vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col items-center text-center mb-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-emerald-50 to-emerald-100/70 shadow-lg shadow-emerald-100/50">
                      <ShieldCheck className="h-8 w-8 text-emerald-600" />
                    </div>

                    <h1 className="mt-6 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                      {t('authCallback.verificationSuccessful')}
                    </h1>
                    <p className="mt-2 text-sm leading-7 text-slate-500">
                      {t('authCallback.identityVerified')}
                    </p>
                  </div>

                  {/* VERIFIED BY Section */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600 mb-3">
                      {t('authCallback.verifiedBy')}
                    </p>
                    <div className="rounded-2xl border border-gray-950/80 bg-linear-to-br from-slate-900 via-slate-900 to-slate-800 p-5 text-left shadow-xl">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">
                          {t('authCallback.nationalId')}
                        </span>
                      </div>

                      {/* User Photo */}
                      {userData.photo_url && (
                        <div className="mb-4 flex justify-center">
                          <img
                            src={userData.photo_url}
                            alt={userData.name || 'User photo'}
                            className="h-16 w-16 rounded-xl border-2 border-emerald-400/30 object-cover shadow-lg shadow-emerald-500/10"
                          />
                        </div>
                      )}

                      <div className="space-y-3">
                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                          <p className="text-xs font-medium text-slate-400">{t('authCallback.fullName')}</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {userData.name || '—'}
                          </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                          <p className="text-xs font-medium text-slate-400">{t('authCallback.gender')}</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {userData.gender || 'N/A'}
                          </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                          <p className="text-xs font-medium text-slate-400">{t('authCallback.dateOfBirth')}</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {userData.birthdate || 'N/A'}
                          </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                          <p className="text-xs font-medium text-slate-400">{t('authCallback.nationality')}</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {userData.nationality || 'N/A'}
                          </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                          <p className="text-xs font-medium text-slate-400">{t('authCallback.address')}</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {userData.address || 'N/A'}
                          </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                          <p className="text-xs font-medium text-slate-400">{t('authCallback.nationalIdPhone')}</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            N/A
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-400" />
                        <span className="text-xs font-semibold text-emerald-400">{t('authCallback.verified')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Details Required */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-slate-900 mb-4">{t('authCallback.additionalDetailsRequired')}</p>

                    {/* Contact Information */}
                    <div className="mb-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">{t('authCallback.contactInformation')}</p>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">{t('authCallback.phoneNumber')}</label>
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder={t('authCallback.phoneNumberPlaceholder')}
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">{t('authCallback.alternativePhone')}</label>
                          <input
                            type="tel"
                            name="alternativePhone"
                            value={formData.alternativePhone}
                            onChange={handleInputChange}
                            placeholder={t('authCallback.alternativePhonePlaceholder')}
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">{t('authCallback.currentLocation')}</label>
                          <input
                            type="text"
                            name="currentLocation"
                            value={formData.currentLocation}
                            onChange={handleInputChange}
                            placeholder={t('authCallback.currentLocationPlaceholder')}
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Personal Details */}
                    <div className="mb-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">{t('authCallback.personalDetails')}</p>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">{t('authCallback.age')}</label>
                          <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">{t('authCallback.drivingLicense')}</label>
                          <select
                            name="drivingLicense"
                            value={formData.drivingLicense}
                            onChange={handleInputChange}
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            required
                          >
                            <option value="">{t('authCallback.select')}</option>
                            <option value="yes">{t('authCallback.yes')}</option>
                            <option value="no">{t('authCallback.no')}</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Employment & Experience */}
                    <div className="mb-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">{t('authCallback.employmentExperience')}</p>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">{t('authCallback.currentlyEmployed')}</label>
                          <select
                            name="currentlyEmployed"
                            value={formData.currentlyEmployed}
                            onChange={handleInputChange}
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            required
                          >
                            <option value="">{t('authCallback.select')}</option>
                            <option value="yes">{t('authCallback.yes')}</option>
                            <option value="no">{t('authCallback.no')}</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">{t('authCallback.previousExperience')}</label>
                          <select
                            name="previousExperience"
                            value={formData.previousExperience}
                            onChange={handleInputChange}
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                          >
                            <option value="">{t('authCallback.select')}</option>
                            <option value="yes">{t('authCallback.yes')}</option>
                            <option value="no">{t('authCallback.no')}</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="mb-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">{t('authCallback.additionalInformation')}</p>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">{t('authCallback.accessibilityConsiderations')}</label>
                          <textarea
                            name="accessibilityConsiderations"
                            value={formData.accessibilityConsiderations}
                            onChange={handleInputChange}
                            placeholder={t('authCallback.accessibilityPlaceholder')}
                            rows={3}
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">{t('authCallback.goals')}</label>
                          <select
                            name="goals"
                            value={formData.goals}
                            onChange={handleInputChange}
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                          >
                            <option value="stable_income">{t('authCallback.stableIncome')}</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">{t('authCallback.howDidYouHear')}</label>
                          <select
                            name="howDidYouHear"
                            value={formData.howDidYouHear}
                            onChange={handleInputChange}
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                          >
                            <option value="telegram">{t('authCallback.telegram')}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn-shimmer group mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-linear-to-r from-emerald-600 to-teal-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    {t('authCallback.submitApplication')}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </form>
              </div>
            )}

            {/* Error State */}
            {status === 'error' && (
              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 shadow-lg shadow-red-50/50">
                  <AlertTriangle className="h-10 w-10 text-red-500" />
                </div>

                <h1 className="mt-8 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  {t('authCallback.verificationFailed')}
                </h1>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {error}
                </p>

                {/* Error detail card */}
                <div className="mt-6 w-full rounded-2xl border border-red-200/60 bg-red-50/40 px-5 py-4 text-left">
                  <p className="text-xs font-semibold text-red-800">{t('authCallback.whatToDo')}</p>
                  <ul className="mt-2 space-y-1.5 text-xs leading-5 text-red-700">
                    <li>{t('authCallback.checkCredentials')}</li>
                    <li>{t('authCallback.checkConnection')}</li>
                    <li>{t('authCallback.tryAgainLater')}</li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={handleRetry}
                  className="group mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-gray-950 bg-white px-7 py-4 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <RotateCcw className="h-4 w-4 transition-transform duration-200 group-hover:-rotate-180" />
                  {t('authCallback.tryAgain')}
                </button>

                <a
                  href="/"
                  className="mt-4 inline-block text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-slate-700"
                >
                  {t('authCallback.backToHome')}
                </a>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  )
}
