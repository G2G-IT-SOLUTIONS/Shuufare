import { FileSearch, CheckCircle2, Clock, Loader2, Award, ArrowLeft } from 'lucide-react'

const timeline = [
  { label: 'Submitted', state: 'complete', icon: CheckCircle2 },
  { label: 'Under Review', state: 'current', icon: Loader2 },
  { label: 'Training', state: 'upcoming', icon: Clock },
  { label: 'Approved', state: 'upcoming', icon: Award },
]

export default function ApplicationStatus() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-white to-slate-50/50 py-16 sm:py-24">
      {/* Background accents */}
      <div className="absolute -right-32 top-1/4 h-72 w-72 rounded-full bg-emerald-50/50 blur-3xl" />
      <div className="absolute -left-32 bottom-1/4 h-64 w-64 rounded-full bg-teal-50/40 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <a
          href="/"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          Back to Home
        </a>

        <div className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white p-1.5 shadow-2xl shadow-slate-950/[0.06]">
          <div className="rounded-4xl bg-linear-to-b from-slate-50/80 to-white p-7 sm:p-10 lg:p-12">
            {/* Header */}
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-4">
              <FileSearch className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-600">Application Status</p>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Track Your Application
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              Follow your application progress in real-time. Your reference code helps us locate your details instantly.
            </p>

            {/* Content Grid */}
            <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              {/* Reference Card */}
              <div className="overflow-hidden rounded-[2rem] bg-linear-to-br from-slate-900 via-slate-900 to-slate-800 p-7 text-white shadow-xl shadow-slate-950/15">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-ring" />
                  <span className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-400">Reference Code</span>
                </div>
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-center">
                  <div className="font-display text-4xl font-bold tracking-tight">SF-2048</div>
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-400">
                  Use your reference code to follow the current stage of the application process.
                </p>

                {/* Status badge */}
                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-1.5 text-sm font-medium text-amber-300">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Under Review
                </div>
              </div>

              {/* Progress Card */}
              <div className="rounded-[2rem] border border-slate-200/80 bg-white p-7">
                <h2 className="font-display text-xl font-bold text-slate-950">Progress</h2>
                <p className="mt-1 text-sm text-slate-500">Your application is being reviewed</p>

                <div className="mt-8 space-y-0">
                  {timeline.map((item, i) => {
                    const Icon = item.icon
                    const isComplete = item.state === 'complete'
                    const isCurrent = item.state === 'current'
                    const isLast = i === timeline.length - 1

                    return (
                      <div key={item.label} className="flex gap-4">
                        {/* Vertical line + dot */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                              isComplete
                                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                                : isCurrent
                                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 ring-4 ring-slate-200/50'
                                  : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            <Icon className={`h-5 w-5 ${isCurrent ? 'animate-spin' : ''}`} />
                          </div>
                          {!isLast && (
                            <div className={`my-1 h-8 w-0.5 rounded-full ${isComplete ? 'bg-emerald-300' : 'bg-slate-200'}`} />
                          )}
                        </div>

                        {/* Content */}
                        <div className="pb-8">
                          <div className={`text-sm font-semibold ${isComplete ? 'text-emerald-700' : isCurrent ? 'text-slate-950' : 'text-slate-400'}`}>
                            {item.label}
                          </div>
                          <div className="mt-0.5 text-xs text-slate-400">
                            {isComplete ? 'Completed' : isCurrent ? 'In progress' : 'Pending'}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
