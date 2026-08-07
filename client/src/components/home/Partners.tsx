import { Handshake } from 'lucide-react'

const partners = [
  { name: 'AWASH BANK', logo: 'https://reg.g2gitsolutions.com/assets/awash-bank.png' },
  { name: 'YANGO', logo: 'https://reg.g2gitsolutions.com/assets/YANGO.png' },
  { name: 'G2G IT SOLUTIONS', logo: 'https://reg.g2gitsolutions.com/assets/g2g-logo.png' },
]

export default function Partners() {
  return (
    <section className="section-divider relative overflow-hidden bg-linear-to-b from-white to-slate-50/50 py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-4">
            <Handshake className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-600">
            Partners
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Our Trusted Partners
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            We work with leading organizations to deliver the best experience.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="hover-lift group flex items-center justify-center gap-4 rounded-4xl border border-slate-200/80 bg-white px-6 py-8 text-center shadow-sm transition-all duration-300 hover:border-emerald-200/60"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 p-2 transition-transform duration-300 group-hover:scale-110">
                <img src={partner.logo} alt={partner.name} className="h-12 w-12 object-contain" />
              </div>
              <span className="text-base font-bold text-slate-800">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
