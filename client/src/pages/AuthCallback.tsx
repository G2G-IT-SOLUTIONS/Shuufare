import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ShieldCheck, AlertTriangle, Loader2, ArrowRight, RotateCcw, CheckCircle2, User, Phone, MapPin, Calendar, Flag, Home, Mail } from 'lucide-react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

// @ts-ignore
const API_URL = import.meta.env.VITE_API_URL;

const getUploadUrl = (path: string | null) => {
  if (!path) return '';
  const baseUrl = API_URL?.replace(/\/api$/, '') || '';
  return `${baseUrl}${path}`;
};

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
  location: {
    region?: string | null
    city?: string | null
    country?: string | null
  }
  phone?: string | null
}

interface FormData {
  phoneNumber: string
  alternativePhone: string
  currentLocation: string
  age: string
  drivingLicense: string
  licensePhoto: File | null
  currentlyEmployed: string
  previousExperience: string
  accessibilityConsiderations: string
  goals: string
  howDidYouHear: string
  joinedTelegram: boolean
}

export default function AuthCallback() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState<Status>('loading')
  const [error, setError] = useState('')
  const [userData, setUserData] = useState<UserData | null>(null)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    phoneNumber: '',
    alternativePhone: '',
    currentLocation: '',
    age: '',
    drivingLicense: '',
    licensePhoto: null,
    currentlyEmployed: '',
    previousExperience: '',
    accessibilityConsiderations: '',
    goals: 'stable_income',
    howDidYouHear: 'telegram',
    joinedTelegram: false
  })
  const [licensePhotoPreview, setLicensePhotoPreview] = useState<string | null>(null)

  const success = searchParams.get('success')
  const errorMsg = searchParams.get('error')

  useEffect(() => {
    if (success !== 'true') {
      setStatus('error')
      return
    }

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
          t('authCallback.verificationFailed')
        )
      }
    }

    fetchProfile()
  }, [success, errorMsg, t])

  useEffect(() => {
    return () => {
      if (licensePhotoPreview) {
        URL.revokeObjectURL(licensePhotoPreview)
      }
    }
  }, [licensePhotoPreview])

  const handleContinue = () => {
    navigate('/complete-profile', { state: { user: userData } })
  }

  const handleRetry = () => {
    window.location.href = `${API_URL}/auth/fayda`
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, type, files, checked, value } = e.target as any

    if (type === 'file' && files && files[0]) {
      const file = files[0]
      setFormData({
        ...formData,
        [name]: file
      })
      if (name === 'licensePhoto') {
        setLicensePhotoPreview(URL.createObjectURL(file))
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userData) {
      setError(t('authCallback.userDataNotAvailable'))
      return
    }

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('userId', userData.id.toString())
      formDataToSend.append('phone', formData.phoneNumber)
      formDataToSend.append('alternativePhone', formData.alternativePhone)
      formDataToSend.append('age', formData.age)
      formDataToSend.append('drivingLicense', formData.drivingLicense)
      formDataToSend.append('currentlyEmployed', formData.currentlyEmployed)
      formDataToSend.append('previousExperience', formData.previousExperience)
      formDataToSend.append('currentLocation', formData.currentLocation)
      formDataToSend.append('accessibilityConsiderations', formData.accessibilityConsiderations)
      formDataToSend.append('goals', formData.goals)
      formDataToSend.append('heard_from', formData.howDidYouHear)

      if (formData.drivingLicense === 'yes' && formData.licensePhoto) {
        formDataToSend.append('license_photo', formData.licensePhoto)
      }

      await axios.post(`${API_URL}/driver/application`, formDataToSend, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setShowSuccessPopup(true)
    } catch (err: any) {
      console.error('Failed to submit application:', err)
      setError(err.response?.data?.error || t('authCallback.submissionFailed'))
    }
  }

  const handleClosePopup = () => {
    setShowSuccessPopup(false)
    navigate('/')
  }

  // Loading State
  if (status === 'loading') {
    return (
      <div className="min-h-screen w-full bg-linear-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-100/60" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-emerald-50 to-emerald-100 shadow-xl">
              <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
            </div>
          </div>
          <h1 className="mt-8 text-2xl font-bold text-slate-900 sm:text-3xl">
            {t('authCallback.verifyingIdentity')}
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            {t('authCallback.verifyingDescription')}
          </p>
          <div className="mt-8 h-1.5 w-full max-w-xs mx-auto overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-1/3 animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full bg-linear-to-r from-emerald-400 via-teal-400 to-emerald-400" />
          </div>
        </div>
      </div>
    )
  }

  // Error State
  if (status === 'error') {
    return (
      <div className="min-h-screen w-full bg-linear-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="flex h-24 w-24 mx-auto items-center justify-center rounded-full bg-red-50 shadow-lg shadow-red-50/50">
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
          <h1 className="mt-8 text-2xl font-bold text-slate-900 sm:text-3xl">
            {t('authCallback.verificationFailed')}
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            {error}
          </p>
          <div className="mt-6 w-full rounded-2xl border border-red-200/60 bg-red-50/40 px-6 py-5 text-left">
            <p className="text-sm font-semibold text-red-800">{t('authCallback.whatToDo')}</p>
            <ul className="mt-2 space-y-2 text-sm text-red-700">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-400">•</span>
                {t('authCallback.checkCredentials')}
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-400">•</span>
                {t('authCallback.checkConnection')}
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-400">•</span>
                {t('authCallback.tryAgainLater')}
              </li>
            </ul>
          </div>
          <button
            type="button"
            onClick={handleRetry}
            className="mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-xl border-2 border-slate-200 bg-white px-7 py-4 text-sm font-semibold text-slate-900 transition-all duration-300 hover:border-slate-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <RotateCcw className="h-4 w-4 transition-transform duration-200 group-hover:-rotate-180" />
            {t('authCallback.tryAgain')}
          </button>
          <a
            href="/"
            className="mt-4 inline-block text-sm font-medium text-slate-400 transition-colors hover:text-slate-700"
          >
            {t('authCallback.backToHome')}
          </a>
        </div>
      </div>
    )
  }

  // Success State - Guard against null userData
  if (!userData) {
    return (
      <div className="min-h-screen w-full bg-linear-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="flex h-24 w-24 mx-auto items-center justify-center rounded-full bg-amber-50 shadow-lg shadow-amber-50/50">
            <AlertTriangle className="h-12 w-12 text-amber-500" />
          </div>
          <h1 className="mt-8 text-2xl font-bold text-slate-900">{t('authCallback.userDataNotAvailable')}</h1>
          <p className="mt-3 text-sm text-slate-500">{t('authCallback.userDataNotAvailableDesc')}</p>
          <button
            type="button"
            onClick={handleRetry}
            className="mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-emerald-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            <RotateCcw className="h-4 w-4" />
            {t('authCallback.tryAgain')}
          </button>
        </div>
      </div>
    )
  }

  // Success State with userData
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-50 via-white to-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Verified Identity */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-linear-to-r from-emerald-50 to-teal-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
                    <ShieldCheck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{t('authCallback.identityVerified')}</h2>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {t('authCallback.verified')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  {userData.photo_url ? (
                    <img
                      src={getUploadUrl(userData.photo_url)}
                      alt={userData.name || t('authCallback.user')}
                      className="h-20 w-20 rounded-2xl border-2 border-emerald-100 object-cover shadow-md"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <User className="h-10 w-10 text-slate-400" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{userData.name || t('authCallback.na')}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <InfoCard icon={User} label={t('authCallback.fullName')} value={userData.name || t('authCallback.na')} />
                  <InfoCard icon={Calendar} label={t('authCallback.dateOfBirth')} value={userData.birthdate || t('authCallback.na')} />
                  <InfoCard icon={Flag} label={t('authCallback.nationality')} value={userData.nationality || t('authCallback.na')} />
                  <InfoCard icon={Home} label={t('authCallback.address')} value= {userData.location
    ? (() => {
        const location =
          typeof userData.location === 'string'
            ? JSON.parse(userData.location)
            : userData.location;

        return [
          location.region,
          location.zone,
          location.woreda,
        ]
          .filter(Boolean)
          .map(value => value.trim())
          .join(', ');
      })()
    : 'N/A'} />
                  <InfoCard icon={Phone} label={t('authCallback.phoneNumber')} value={userData.phone || t('authCallback.na')} />
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
              <p className="text-sm text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                {t('authCallback.verificationSuccessMessage')}
              </p>
            </div>
          </div>

          {/* Right Column - Application Form */}
          <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900">{t('authCallback.driverApplication')}</h2>
              <p className="text-sm text-slate-500">{t('authCallback.completeRequiredFields')}</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
              {/* Contact Information */}
              <Section title={t('authCallback.contactInformation')} icon={Phone}>
                <InputGroup>
                  <InputField
                    label={t('authCallback.phoneNumber')}
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder={t('authCallback.phoneNumberPlaceholder')}
                    required
                  />
                  <InputField
                    label={t('authCallback.alternativePhone')}
                    name="alternativePhone"
                    type="tel"
                    value={formData.alternativePhone}
                    onChange={handleInputChange}
                    placeholder={t('authCallback.alternativePhonePlaceholder')}
                  />
                </InputGroup>
                <InputField
                  label={t('authCallback.currentLocation')}
                  name="currentLocation"
                  type="text"
                  value={formData.currentLocation}
                  onChange={handleInputChange}
                  placeholder={t('authCallback.currentLocationPlaceholder')}
                  required
                />
              </Section>

              {/* Personal Details */}
              <Section title={t('authCallback.personalDetails')} icon={User}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <InputField
                    label={t('authCallback.age')}
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder={t('25')}
                    required
                  />
                  <SelectField
                    label={t('authCallback.drivingLicense')}
                    name="drivingLicense"
                    value={formData.drivingLicense}
                    onChange={handleInputChange}
                    required
                    options={[
                      { value: '', label: t('authCallback.select') },
                      { value: 'yes', label: t('authCallback.yes') },
                      { value: 'no', label: t('authCallback.no') }
                    ]}
                  />
                  {formData.drivingLicense === 'yes' && (
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-slate-700 mb-1.5">
                        {t('authCallback.licensePhoto')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        name="licensePhoto"
                        accept="image/*"
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                      {licensePhotoPreview && (
                        <div className="mt-3">
                          <img
                            src={licensePhotoPreview}
                            alt="License preview"
                            className="h-32 w-auto object-cover rounded-xl border border-slate-200 shadow-sm"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Section>

              {/* Employment & Experience */}
              <Section title={t('authCallback.employmentExperience')} icon={Briefcase}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <SelectField
                    label={t('authCallback.currentlyEmployed')}
                    name="currentlyEmployed"
                    value={formData.currentlyEmployed}
                    onChange={handleInputChange}
                    required
                    options={[
                      { value: '', label: t('authCallback.select') },
                      { value: 'yes', label: t('authCallback.yes') },
                      { value: 'no', label: t('authCallback.no') }
                    ]}
                  />
                  <SelectField
                    label={t('authCallback.previousExperience')}
                    name="previousExperience"
                    value={formData.previousExperience}
                    onChange={handleInputChange}
                    options={[
                      { value: '', label: t('authCallback.select') },
                      { value: 'yes', label: t('authCallback.yes') },
                      { value: 'no', label: t('authCallback.no') }
                    ]}
                  />
                </div>
              </Section>

              {/* Additional Information */}
              <Section title={t('authCallback.additionalInformation')} icon={Info}>
                <TextAreaField
                  label={t('authCallback.accessibilityConsiderations')}
                  name="accessibilityConsiderations"
                  value={formData.accessibilityConsiderations}
                  onChange={handleInputChange}
                  placeholder={t('authCallback.accessibilityPlaceholder')}
                  rows={2}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <SelectField
                    label={t('authCallback.goals')}
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    options={[
                      { value: 'stable_income', label: t('authCallback.stableIncome') },
                      { value: 'ownership', label: t('authCallback.ownership') },
                      { value: 'employment', label: t('authCallback.employment') }

                    ]}
                  />
                 <SelectField 
  label={t('authCallback.howDidYouHear')} 
  name="howDidYouHear" 
  value={formData.howDidYouHear} 
  onChange={handleInputChange} 
  options={[
    { value: 'telegram', label: t('authCallback.telegram') },
    { value: 'friend', label: t('authCallback.friend') },
    { value: 'other', label: t('authCallback.other') },
  ]} 
/>
                
                </div>
              </Section>

              <div className="flex items-start gap-3 mb-6">
                <input
                  type="checkbox"
                  name="joinedTelegram"
                  id="joinedTelegram"
                  checked={formData.joinedTelegram}
                  onChange={handleInputChange}
                  required
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="joinedTelegram" className="text-sm text-slate-600">
                  {t('authCallback.iHaveJoinedTelegram')}{' '}
                  <a
                    href="https://t.me/shuufare_eth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-600 hover:text-emerald-700 underline"
                  >
                    {t('authCallback.joinTelegramGroup')}
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-6 inline-flex items-center justify-center gap-2.5 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
              >
                {t('authCallback.submitApplication')}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <SuccessPopup show={showSuccessPopup} onClose={handleClosePopup} t={t} />
    </div>
  )
}

// Helper Components
const InfoCard = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="bg-slate-50 rounded-xl p-3 hover:bg-slate-100 transition-colors">
    <div className="flex items-start gap-2">
      <Icon className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-medium text-slate-900 truncate">{value}</p>
      </div>
    </div>
  </div>
)

const Section = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
  <div className="mb-6 last:mb-0">
    <div className="flex items-center gap-2 mb-3">
      <Icon className="h-4 w-4 text-slate-400" />
      <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
      <div className="flex-1 border-t border-slate-200" />
    </div>
    <div className="space-y-3">
      {children}
    </div>
  </div>
)

const InputGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    {children}
  </div>
)

const InputField = ({ label, name, type, value, onChange, placeholder, required }: any) => (
  <div>
    <label className="block text-xs font-medium text-slate-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
    />
  </div>
)

const SelectField = ({ label, name, value, onChange, required, options }: any) => (
  <div>
    <label className="block text-xs font-medium text-slate-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
    >
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
)

const TextAreaField = ({ label, name, value, onChange, placeholder, rows }: any) => (
  <div>
    <label className="block text-xs font-medium text-slate-700 mb-1.5">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows || 3}
      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
    />
  </div>
)

// Icons needed
const Briefcase = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const Info = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

// Success Popup
const SuccessPopup = ({ show, onClose, t }: { show: boolean, onClose: () => void, t: any }) => {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
        <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-emerald-100 mb-4">
          <svg className="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{t('authCallback.applicationSubmitted')}</h2>
        <p className="text-slate-600 mb-6">{t('authCallback.applicationSubmittedDescription')}</p>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
        >
          {t('authCallback.close')}
        </button>
      </div>
    </div>
  )
}