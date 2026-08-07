import { 
  Users, 
  Flower2,
  Accessibility,
  GraduationCap,
  Clock,
  Car,
  Flag
} from 'lucide-react'
import Hero from '../components/home/Hero'
import HowItWorks from '../components/home/HowItWorks'
import Benefits from '../components/home/Benefits'
import Testimonials from '../components/home/Testimonials'
import FAQ from '../components/home/FAQ'
import Partners from '../components/home/Partners'
import QRRegistration from '../components/home/QRRegistration'
import CTASection from '../components/home/CTASection'

const eligibleGroups = [
  { 
    text: 'Women looking for stable income', 
    icon: Flower2,
    description: 'Flexible opportunities designed for women',
    color: 'rose'
  },
  { 
    text: 'People with disabilities able to operate a vehicle', 
    icon: Accessibility,
    description: 'Inclusive roles with necessary accommodations',
    color: 'blue'
  },
  { 
    text: 'Young people seeking employment', 
    icon: GraduationCap,
    description: 'Great starting point for your career journey',
    color: 'amber'
  },
  { 
    text: 'Older individuals with driving experience', 
    icon: Clock,
    description: 'Leverage your years of driving expertise',
    color: 'indigo'
  },
  { 
    text: 'Anyone with a valid driving license', 
    icon: Car,
    description: 'All license holders are welcome to apply',
    color: 'emerald'
  },
  { 
    text: 'Residents of Ethiopia', 
    icon: Flag,
    description: 'Open to all Ethiopian residents',
    color: 'purple'
  },
]

const colorVariants = {
  rose: {
    bg: 'bg-rose-50',
    hover: 'group-hover:bg-rose-100/70',
    icon: 'text-rose-600',
    border: 'hover:border-rose-200/80',
    shadow: 'hover:shadow-rose-50/50',
    badge: 'bg-rose-50 text-rose-700 ring-rose-200/60',
    linear: 'from-rose-50 to-rose-100/50'
  },
  blue: {
    bg: 'bg-blue-50',
    hover: 'group-hover:bg-blue-100/70',
    icon: 'text-blue-600',
    border: 'hover:border-blue-200/80',
    shadow: 'hover:shadow-blue-50/50',
    badge: 'bg-blue-50 text-blue-700 ring-blue-200/60',
    linear: 'from-blue-50 to-blue-100/50'
  },
  amber: {
    bg: 'bg-amber-50',
    hover: 'group-hover:bg-amber-100/70',
    icon: 'text-amber-600',
    border: 'hover:border-amber-200/80',
    shadow: 'hover:shadow-amber-50/50',
    badge: 'bg-amber-50 text-amber-700 ring-amber-200/60',
    linear: 'from-amber-50 to-amber-100/50'
  },
  indigo: {
    bg: 'bg-indigo-50',
    hover: 'group-hover:bg-indigo-100/70',
    icon: 'text-indigo-600',
    border: 'hover:border-indigo-200/80',
    shadow: 'hover:shadow-indigo-50/50',
    badge: 'bg-indigo-50 text-indigo-700 ring-indigo-200/60',
    linear: 'from-indigo-50 to-indigo-100/50'
  },
  emerald: {
    bg: 'bg-emerald-50',
    hover: 'group-hover:bg-emerald-100/70',
    icon: 'text-emerald-600',
    border: 'hover:border-emerald-200/80',
    shadow: 'hover:shadow-emerald-50/50',
    badge: 'bg-emerald-50 text-emerald-700 ring-emerald-200/60',
    linear: 'from-emerald-50 to-emerald-100/50'
  },
  purple: {
    bg: 'bg-purple-50',
    hover: 'group-hover:bg-purple-100/70',
    icon: 'text-purple-600',
    border: 'hover:border-purple-200/80',
    shadow: 'hover:shadow-purple-50/50',
    badge: 'bg-purple-50 text-purple-700 ring-purple-200/60',
    linear: 'from-purple-50 to-purple-100/50'
  }
}

export default function Home() {
  return (
    <main className="bg-white text-slate-950">
      <Hero />
      <HowItWorks />
      <Testimonials />
      <Benefits />
      <FAQ />

      {/* Who Can Apply Section - Improved with Lucide Icons */}
      <section id="who-can-apply" className="section-divider relative overflow-hidden bg-linear-to-b from-slate-50 via-white to-slate-50/50 py-24 sm:py-32">
        {/* Background decoration */}
        <div className="absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-emerald-100/20 blur-3xl" />
        <div className="absolute -right-20 bottom-1/3 h-96 w-96 rounded-full bg-emerald-50/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-50 to-emerald-100/70 text-emerald-600 shadow-sm">
              <Users className="h-7 w-7" />
            </div>          
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Who Can Apply?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              We believe in creating opportunities for everyone. Check if you qualify to join our community of drivers.
            </p>
          </div>

          {/* Grid */}
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {eligibleGroups.map((item, index) => {
              const Icon = item.icon
              const colors = colorVariants[item.color as keyof typeof colorVariants]
              
              return (
                <div
                  key={item.text}
                  className={`group relative rounded-2xl border border-slate-200/60 bg-white p-6 transition-all duration-300 ${colors.border} ${colors.shadow} hover:shadow-lg hover:-translate-y-1`}
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  {/* Card content */}
                  <div className="flex items-start gap-4">
                    {/* Icon container */}
                    <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${colors.bg} transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 ${colors.hover}`}>
                      <Icon className={`h-7 w-7 ${colors.icon} transition-transform duration-300 group-hover:scale-110`} />
                      {/* Glow effect */}
                      <div className={`absolute inset-0 rounded-xl ${colors.bg} opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-xl -z-10`} />
                    </div>

                    {/* Text content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold leading-6 text-slate-900">
                        {item.text}
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {item.description}
                      </p>
                      
                     
                    </div>
                  </div>

                  {/* Decorative border linear on hover */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" 
                    style={{
                      background: `linear-linear(135deg, rgba(16, 185, 129, 0) 0%, rgba(16, 185, 129, 0) 60%, rgba(16, 185, 129, 0.08) 100%)`
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Partners />
      <QRRegistration />
      <CTASection />
    </main>
  )
}