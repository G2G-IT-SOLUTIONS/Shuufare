import { FileText, ArrowRight, User, Phone, Mail, MessageSquare, Send } from 'lucide-react'

export default function Register() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-slate-50 to-white py-16 sm:py-24">
      {/* Background accents */}
      <div className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-emerald-50/60 blur-3xl" />
      <div className="absolute -right-32 bottom-1/4 h-64 w-64 rounded-full bg-teal-50/40 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white p-1.5 shadow-2xl shadow-slate-950/6">
          <div className="rounded-4xl bg-linear-to-b from-white to-slate-50/30 p-7 sm:p-10 lg:p-12">
            {/* Header */}
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-4">
              <FileText className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-600">Register</p>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Start your Shuufare application.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              Fill out the form below to begin your registration. We'll review your details and get back to you promptly.
            </p>

            {/* Content Grid */}
            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
              {/* Form */}
              <form className="space-y-5 rounded-4xl border border-slate-200/80 bg-slate-50/50 p-7">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition-all duration-200 focus:border-emerald-400 focus:shadow-sm"
                      placeholder="Full name"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition-all duration-200 focus:border-emerald-400 focus:shadow-sm"
                      placeholder="Phone number"
                    />
                  </div>
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition-all duration-200 focus:border-emerald-400 focus:shadow-sm"
                    placeholder="Email address"
                  />
                </div>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 h-4 w-4 text-slate-400" />
                  <textarea
                    className="min-h-36 w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition-all duration-200 focus:border-emerald-400 focus:shadow-sm"
                    placeholder="Tell us about your driving experience"
                  />
                </div>
                <button
                  type="button"
                  className="btn-shimmer group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-emerald-600 to-teal-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <Send className="h-4 w-4" />
                  Submit Application
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </form>

              {/* Sidebar */}
              <aside className="flex flex-col gap-5">
                <div className="rounded-4xl bg-linear-to-br from-slate-900 via-slate-900 to-slate-800 p-7 text-white shadow-xl shadow-slate-950/15">
                  <h2 className="font-display text-xl font-bold">What happens next</h2>
                  <ul className="mt-6 space-y-5">
                    {[
                      { step: '01', text: 'Your details are reviewed by the operations team.' },
                      { step: '02', text: 'Document and eligibility checks are completed.' },
                      { step: '03', text: 'You receive a clear application status update.' },
                    ].map((item) => (
                      <li key={item.step} className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-xs font-bold text-emerald-400">
                          {item.step}
                        </span>
                        <span className="text-sm leading-7 text-slate-300">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-4xl border border-emerald-200/60 bg-emerald-50/40 p-6">
                  <p className="text-sm font-semibold text-emerald-800">💡 Quick tip</p>
                  <p className="mt-2 text-sm leading-7 text-emerald-700">
                    Have your driving license ready — it speeds up the verification process significantly.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
