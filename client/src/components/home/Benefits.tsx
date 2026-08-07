import { Zap, Shield, Wrench, Heart } from 'lucide-react'

const benefits = [
  {
    title: 'Electric Vehicles',
    description: 'Drive modern, eco-friendly EVs. Save on fuel and drive the future.',
    icon: Zap,
    accent: 'bg-emerald-500',
    accentLight: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'Insurance Coverage',
    description: "You're fully protected while working. Peace of mind for every mile.",
    icon: Shield,
    accent: 'bg-cyan-500',
    accentLight: 'bg-cyan-50 text-cyan-600',
  },
  {
    title: 'Maintenance Covered',
    description: 'No repair stress, no hidden costs. We handle the technical side.',
    icon: Wrench,
    accent: 'bg-violet-500',
    accentLight: 'bg-violet-50 text-violet-600',
  },
  {
    title: 'Inclusive Opportunities',
    description: 'Women, people with disabilities, commercial drivers, youth, and seniors are welcome.',
    icon: Heart,
    accent: 'bg-amber-500',
    accentLight: 'bg-amber-50 text-amber-600',
  },
]

export default function Benefits() {
  return (
    <section id="benefits" className="section-divider relative bg-white py-24 sm:py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-emerald-50/60 blur-3xl" />
      <div className="absolute -right-32 bottom-1/4 h-64 w-64 rounded-full bg-cyan-50/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="max-w-xl">
            <p className="text-3xl font-bold text-center tracking-tight text-slate-950 sm:text-4xl lg:text-left lg:text-5xl">
              Why Shuufare?
            </p>
              <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-teal-600" />

            <h2 className="mt-2 font-display text-3xl  tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              We provide the tools you need to{' '}
              <span className="text-linear-warm">succeed</span>.
            </h2>
       
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <article
                  key={benefit.title}
                  className="hover-lift group relative overflow-hidden rounded-4xl border border-slate-200/80 bg-linear-to-b from-white to-slate-50/30 p-7 shadow-sm"
                >
                  {/* Subtle corner glow on hover */}
                  <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full ${benefit.accent} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-10`} />

                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${benefit.accentLight} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="mt-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
                    0{index + 1}
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-slate-950 transition-colors duration-200 group-hover:text-emerald-700">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{benefit.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
