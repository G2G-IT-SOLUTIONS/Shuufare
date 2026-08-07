import { ClipboardCheck, ShieldCheck, Wrench, UserCheck, ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Register Online',
    description: 'Register with your National ID (Fayda) in under 3 minutes.',
    icon: ClipboardCheck,
    color: 'from-emerald-500 to-teal-500',
    shadow: 'shadow-emerald-500/20',
  },
  {
    number: '02',
    title: 'Verification',
    description: 'We review your details and additional documents.',
    icon: ShieldCheck,
    color: 'from-cyan-500 to-blue-500',
    shadow: 'shadow-cyan-500/20',
  },
  {
    number: '03',
    title: 'Training',
    description: 'Receive safety, platform basics, and onboarding support.',
    icon: Wrench,
    color: 'from-violet-500 to-purple-500',
    shadow: 'shadow-violet-500/20',
  },
  {
    number: '04',
    title: 'Start Working',
    description: 'Get assigned a Shuufare vehicle and schedule.',
    icon: UserCheck,
    color: 'from-amber-500 to-orange-500',
    shadow: 'shadow-amber-500/20',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-divider relative bg-white py-12 sm:py-32">
      <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-emerald-50/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
       <div className="text-center">
  <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
    How It Works
  </h2>

  <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-teal-600" />
</div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <article
                key={step.number}
                className="hover-lift group relative rounded-[4xl] border border-slate-200/80 bg-linear-to-b from-white to-slate-50/50 p-7 shadow-sm"
              >
                {/* Step connector line (hidden on last) */}
                {i < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-slate-200 xl:block" />
                )}

                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${step.color} text-white shadow-lg ${step.shadow} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="h-6 w-6" />
                </div>

                <div className="mt-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
                  Step {step.number}
                </div>

                <h3 className="mt-4 text-xl font-bold text-slate-950 transition-colors duration-200 group-hover:text-emerald-700">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>

                <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-emerald-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span>Learn more</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
