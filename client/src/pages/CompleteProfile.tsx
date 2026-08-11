import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  ShieldCheck,
  Phone,
  User,
  MapPin,
  Car,
  Briefcase,
  Target,
  Megaphone,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  Send,
  Loader2,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL

interface FaydaUser {
  id: number
  fayda_id: string
  name: string | null
  email: string | null
}

interface FormData {
  phone: string
  alternative_phone: string
  age: string
  gender: string
  has_license: string
  license_photo: string
  currently_employed: string
  previous_experience: string
  previous_platform: string
  location: string
  accessibility_considerations: string
  goals: string
  future_opportunities: string
  heard_from: string
  till_number: string
  fcn_number: string
  targa_number: string
}

const initialFormData: FormData = {
  phone: '',
  alternative_phone: '',
  age: '',
  gender: '',
  has_license: '',
  license_photo: '',
  currently_employed: '',
  previous_experience: '',
  previous_platform: '',
  location: '',
  accessibility_considerations: '',
  goals: '',
  future_opportunities: '',
  heard_from: '',
  till_number: '',
  fcn_number: '',
  targa_number: '',
}

const steps = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Driving', icon: Car },
  { id: 3, title: 'Experience', icon: Briefcase },
  { id: 4, title: 'Final Details', icon: Target },
]

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
]

const licenseOptions = [
  { value: 'yes', label: 'Yes, I have a valid license' },
  { value: 'no', label: 'No, I don\'t have a license' },
  { value: 'expired', label: 'Expired — plan to renew' },
]

const employmentOptions = [
  { value: 'yes', label: 'Currently employed' },
  { value: 'no', label: 'Not employed' },
  { value: 'part_time', label: 'Part-time / freelance' },
]

const experienceOptions = [
  { value: 'none', label: 'No experience' },
  { value: 'less_1', label: 'Less than 1 year' },
  { value: '1_3', label: '1–3 years' },
  { value: '3_plus', label: '3+ years' },
]

const heardFromOptions = [
  { value: 'social_media', label: 'Social Media' },
  { value: 'friend', label: 'Friend / Family' },
  { value: 'advertisement', label: 'Advertisement' },
  { value: 'website', label: 'Website' },
  { value: 'other', label: 'Other' },
]

export default function CompleteProfile() {
  const location = useLocation()
  const navigate = useNavigate()
  const [faydaUser, setFaydaUser] = useState<FaydaUser | null>(
    location.state?.user || null
  )
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // If no user data passed via state, try fetching from session
  useEffect(() => {
    if (!faydaUser) {
      axios
        .get(`${API_URL}/user/profile`, { withCredentials: true })
        .then((res) => setFaydaUser(res.data.user))
        .catch(() => navigate('/'))
    }
  }, [faydaUser, navigate])

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, steps.length))
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1))

  const handleSubmit = async () => {
    setSubmitting(true)
    setSubmitError('')

    try {
      await axios.post(`${API_URL}/user/profile`, formData, {
        withCredentials: true,
      })
      navigate('/application-status')
    } catch (err: any) {
      console.error('Submit error:', err)
      setSubmitError(
        err.response?.data?.error || 'Failed to submit. Please try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (!faydaUser) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </main>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-slate-50 to-white py-10 sm:py-16">
      {/* Background accents */}
      <div className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-emerald-50/60 blur-3xl" />
      <div className="absolute -right-32 bottom-1/4 h-64 w-64 rounded-full bg-teal-50/40 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-600">
            Complete Application
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Almost there — fill in a few details.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-8 text-slate-500">
            We already verified your identity via Fayda. Now tell us a bit more about you.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.42fr]">
          {/* Form Card */}
          <div className="overflow-hidden rounded-[2.5rem] border border-gray-950/80 bg-white p-1.5 shadow-2xl shadow-slate-950/6">
            <div className="rounded-4xl bg-linear-to-b from-white to-slate-50/30 p-7 sm:p-9">

              {/* Step Progress */}
              <div className="mb-9 flex items-center gap-2">
                {steps.map((step, i) => {
                  const StepIcon = step.icon
                  const isActive = currentStep === step.id
                  const isComplete = currentStep > step.id
                  return (
                    <div key={step.id} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(step.id)}
                        className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                          isActive
                            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                            : isComplete
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {isComplete ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : (
                          <StepIcon className="h-3.5 w-3.5" />
                        )}
                        <span className="hidden sm:inline">{step.title}</span>
                      </button>
                      {i < steps.length - 1 && (
                        <div
                          className={`h-0.5 w-6 rounded-full transition-colors duration-300 ${
                            isComplete ? 'bg-emerald-300' : 'bg-gray-950'
                          }`}
                        />
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in">
                  <h2 className="text-lg font-bold text-slate-950">Personal Information</h2>
                  <p className="text-sm text-slate-500">Your contact details and basic info.</p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        className="w-full rounded-2xl border border-gray-950 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition-all duration-200 focus:border-emerald-400 focus:shadow-sm"
                        placeholder="Phone number *"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        className="w-full rounded-2xl border border-gray-950 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition-all duration-200 focus:border-emerald-400 focus:shadow-sm"
                        placeholder="Alternative phone (optional)"
                        value={formData.alternative_phone}
                        onChange={(e) =>
                          updateField('alternative_phone', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      type="number"
                      className="w-full rounded-2xl border border-gray-950 bg-white py-3.5 px-4 text-sm outline-none transition-all duration-200 focus:border-emerald-400 focus:shadow-sm"
                      placeholder="Age"
                      value={formData.age}
                      onChange={(e) => updateField('age', e.target.value)}
                    />
                    <div className="flex gap-2">
                      {genderOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => updateField('gender', opt.value)}
                          className={`flex-1 rounded-2xl border py-3.5 text-sm font-medium transition-all duration-200 ${
                            formData.gender === opt.value
                              ? 'border-emerald-400 bg-emerald-50 text-emerald-700 shadow-sm'
                              : 'border-gray-950 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      className="w-full rounded-2xl border border-gray-950 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition-all duration-200 focus:border-emerald-400 focus:shadow-sm"
                      placeholder="Location (city / area)"
                      value={formData.location}
                      onChange={(e) => updateField('location', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Driving & License */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-in fade-in">
                  <h2 className="text-lg font-bold text-slate-950">Driving & License</h2>
                  <p className="text-sm text-slate-500">Tell us about your driving credentials.</p>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Do you have a valid driving license?
                    </label>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {licenseOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => updateField('has_license', opt.value)}
                          className={`rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 ${
                            formData.has_license === opt.value
                              ? 'border-emerald-400 bg-emerald-50 text-emerald-700 shadow-sm'
                              : 'border-gray-950 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.has_license === 'yes' && (
                    <div className="relative">
                      <input
                        className="w-full rounded-2xl border border-gray-950 bg-white py-3.5 px-4 text-sm outline-none transition-all duration-200 focus:border-emerald-400 focus:shadow-sm"
                        placeholder="License photo URL (optional)"
                        value={formData.license_photo}
                        onChange={(e) =>
                          updateField('license_photo', e.target.value)
                        }
                      />
                    </div>
                  )}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Vehicle identification numbers (if available)
                    </label>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <input
                        className="w-full rounded-2xl border border-gray-950 bg-white py-3.5 px-4 text-sm outline-none transition-all duration-200 focus:border-emerald-400 focus:shadow-sm"
                        placeholder="Till number"
                        value={formData.till_number}
                        onChange={(e) =>
                          updateField('till_number', e.target.value)
                        }
                      />
                      <input
                        className="w-full rounded-2xl border border-gray-950 bg-white py-3.5 px-4 text-sm outline-none transition-all duration-200 focus:border-emerald-400 focus:shadow-sm"
                        placeholder="FCN number"
                        value={formData.fcn_number}
                        onChange={(e) =>
                          updateField('fcn_number', e.target.value)
                        }
                      />
                      <input
                        className="w-full rounded-2xl border border-gray-950 bg-white py-3.5 px-4 text-sm outline-none transition-all duration-200 focus:border-emerald-400 focus:shadow-sm"
                        placeholder="Targa number"
                        value={formData.targa_number}
                        onChange={(e) =>
                          updateField('targa_number', e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Experience */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-in fade-in">
                  <h2 className="text-lg font-bold text-slate-950">Work Experience</h2>
                  <p className="text-sm text-slate-500">Share your employment and ride-hailing background.</p>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Are you currently employed?
                    </label>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {employmentOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() =>
                            updateField('currently_employed', opt.value)
                          }
                          className={`rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 ${
                            formData.currently_employed === opt.value
                              ? 'border-emerald-400 bg-emerald-50 text-emerald-700 shadow-sm'
                              : 'border-gray-950 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Previous ride-hailing experience
                    </label>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {experienceOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() =>
                            updateField('previous_experience', opt.value)
                          }
                          className={`rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 ${
                            formData.previous_experience === opt.value
                              ? 'border-emerald-400 bg-emerald-50 text-emerald-700 shadow-sm'
                              : 'border-gray-950 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.previous_experience !== 'none' &&
                    formData.previous_experience !== '' && (
                      <input
                        className="w-full rounded-2xl border border-gray-950 bg-white py-3.5 px-4 text-sm outline-none transition-all duration-200 focus:border-emerald-400 focus:shadow-sm"
                        placeholder="Which platform? (e.g. Ride, Feres, ZayRide)"
                        value={formData.previous_platform}
                        onChange={(e) =>
                          updateField('previous_platform', e.target.value)
                        }
                      />
                    )}
                </div>
              )}

              {/* Step 4: Final Details */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-in fade-in">
                  <h2 className="text-lg font-bold text-slate-950">Final Details</h2>
                  <p className="text-sm text-slate-500">A few last questions and you're done!</p>

                  <textarea
                    className="min-h-24 w-full rounded-2xl border border-gray-950 bg-white py-3.5 px-4 text-sm outline-none transition-all duration-200 focus:border-emerald-400 focus:shadow-sm"
                    placeholder="Any accessibility considerations we should know about?"
                    value={formData.accessibility_considerations}
                    onChange={(e) =>
                      updateField('accessibility_considerations', e.target.value)
                    }
                  />

                  <textarea
                    className="min-h-24 w-full rounded-2xl border border-gray-950 bg-white py-3.5 px-4 text-sm outline-none transition-all duration-200 focus:border-emerald-400 focus:shadow-sm"
                    placeholder="What are your goals in joining Shuufare?"
                    value={formData.goals}
                    onChange={(e) => updateField('goals', e.target.value)}
                  />

                  <textarea
                    className="min-h-24 w-full rounded-2xl border border-gray-950 bg-white py-3.5 px-4 text-sm outline-none transition-all duration-200 focus:border-emerald-400 focus:shadow-sm"
                    placeholder="What future opportunities interest you?"
                    value={formData.future_opportunities}
                    onChange={(e) =>
                      updateField('future_opportunities', e.target.value)
                    }
                  />

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      How did you hear about us?
                    </label>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {heardFromOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => updateField('heard_from', opt.value)}
                          className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                            formData.heard_from === opt.value
                              ? 'border-emerald-400 bg-emerald-50 text-emerald-700 shadow-sm'
                              : 'border-gray-950 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit error */}
                  {submitError && (
                    <div className="flex items-start gap-3 rounded-2xl border border-red-200/60 bg-red-50/50 px-5 py-4">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                      <p className="text-sm text-red-700">{submitError}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between gap-3">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="group inline-flex items-center gap-2 rounded-full border border-gray-950 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-shimmer group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-emerald-600 to-teal-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="btn-shimmer group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-emerald-600 to-teal-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:pointer-events-none disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Submit Application
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-5">
            {/* Fayda Verified Data */}
            <div className="overflow-hidden rounded-4xl bg-linear-to-br from-slate-900 via-slate-900 to-slate-800 p-7 text-white shadow-xl shadow-slate-950/15">
              <div className="flex items-center gap-2 mb-5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">
                  Verified Identity
                </span>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-[11px] font-medium text-slate-400">Name</p>
                  <p className="mt-0.5 text-sm font-semibold text-white">
                    {faydaUser.name || '—'}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-[11px] font-medium text-slate-400">Email</p>
                  <p className="mt-0.5 text-sm font-semibold text-white">
                    {faydaUser.email || '—'}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-[11px] font-medium text-slate-400">Fayda ID</p>
                  <p className="mt-0.5 font-mono text-sm font-semibold text-emerald-400">
                    {faydaUser.fayda_id}
                  </p>
                </div>
              </div>
            </div>

            {/* Steps Overview */}
            <div className="rounded-4xl border border-gray-950/80 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900">Your Progress</h3>
              <div className="mt-5 space-y-0">
                {steps.map((step, i) => {
                  const isComplete = currentStep > step.id
                  const isActive = currentStep === step.id
                  const isLast = i === steps.length - 1
                  return (
                    <div key={step.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-all duration-300 ${
                            isComplete
                              ? 'bg-emerald-500 text-white'
                              : isActive
                              ? 'bg-slate-900 text-white ring-4 ring-slate-100'
                              : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {isComplete ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            step.id
                          )}
                        </div>
                        {!isLast && (
                          <div
                            className={`my-1 h-6 w-0.5 rounded-full ${
                              isComplete ? 'bg-emerald-300' : 'bg-gray-950'
                            }`}
                          />
                        )}
                      </div>
                      <div className="pb-6">
                        <p
                          className={`text-xs font-semibold ${
                            isComplete
                              ? 'text-emerald-700'
                              : isActive
                              ? 'text-slate-950'
                              : 'text-slate-400'
                          }`}
                        >
                          {step.title}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400">
                          {isComplete
                            ? 'Completed'
                            : isActive
                            ? 'In progress'
                            : 'Pending'}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Tip */}
            <div className="rounded-4xl border border-emerald-200/60 bg-emerald-50/40 p-5">
              <p className="text-xs font-semibold text-emerald-800">
                <Megaphone className="mr-1.5 inline h-3.5 w-3.5" />
                Quick tip
              </p>
              <p className="mt-2 text-xs leading-5 text-emerald-700">
                Fields marked with * are required. Everything else is optional but helps us match you faster.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
