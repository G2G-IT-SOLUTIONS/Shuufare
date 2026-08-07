import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    quote: 'Shuufare has given me the stability and support I needed to build a better life.',
    name: 'Tesfaye A.',
    role: 'Yango Driver',
    rating: 5,
    avatar: 'T',
  },
  {
    quote: 'Shuufare changed my life for the better. Everyone is supportive and the income is reliable.',
    name: 'Amina G.',
    role: 'Yango Driver',
    rating: 5,
    avatar: 'A',
  },
  {
    quote: "I feel welcomed and valued with Shuufare. It's been a fantastic job!",
    name: 'Samuel H.',
    role: 'Yango Rider',
    rating: 5,
    avatar: 'S',
  },
]

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-slate-50 to-white py-24 sm:py-32">
      {/* Background accent */}
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-50/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">         
          <h2 className=" font-display text-3xl text-center font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Real Drivers, Real Stories
              <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-teal-600" />
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Hear from the people who drive with Shuufare every day.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="hover-lift group relative overflow-hidden rounded-4xl border border-slate-200/80 bg-white p-7 shadow-sm"
            >
              {/* Quote icon */}
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                <Quote className="h-5 w-5" />
              </div>

              {/* Stars */}
              <div className="mt-4 flex gap-1">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="mt-4 text-base leading-8 text-slate-700">
                "{item.quote}"
              </blockquote>

              <figcaption className="mt-7 flex items-center gap-4 border-t border-slate-100 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-teal-500 text-lg font-bold text-white shadow-md shadow-emerald-500/20">
                  {item.avatar}
                </div>
                <div>
                  <div className="font-semibold text-slate-950">{item.name}</div>
                  <div className="text-sm text-slate-500">{item.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
