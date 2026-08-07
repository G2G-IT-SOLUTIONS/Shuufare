import { Rocket, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-black  text-white ">
      {/* Ambient orbs with refined opacity */}
      <div className="absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute -right-32 bottom-1/4 h-64 w-64 rounded-full bg-teal-500/5 blur-3xl" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-linear-to-r from-transparent via-emerald-400/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main CTA Card - refined glass effect */}
        <div className="relative rounded-[2.5rem] bg-white/[0.03] p-8 shadow-2xl backdrop-blur-sm ring-1 ring-white/5 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              <Rocket className="h-7 w-7 text-emerald-400" />
              Ready to Start your Journey?
            </div>
            <p className="mt-2 text-base text-slate-400 sm:text-lg">
              Join the movement today and drive your own future.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
            <a
              href="#register"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-emerald-500/30"
            >
              Start Application
              <Rocket className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Contact Footer Grid - refined cards */}
        <div className="mt-8 grid gap-3 overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Contact */}
          <div className="rounded-3xl bg-white/[0.04] p-6 transition-colors duration-300 hover:bg-white/[0.07]">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Contact</span>
            </div>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="h-3.5 w-3.5 text-slate-500" />
                <span>+251 911 123 456</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="h-3.5 w-3.5 text-slate-500" />
                <span>info@shuufare.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <MessageCircle className="h-3.5 w-3.5 text-slate-500" />
                <span>@shuufare_eth</span>
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="rounded-3xl bg-white/[0.04] p-6 transition-colors duration-300 hover:bg-white/[0.07]">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Empowering Drivers</div>
            <p className="mt-5 text-sm leading-relaxed text-slate-300">
              Stable income, dedicated support, and the foundation to build a better future.
            </p>
          </div>

          {/* Address */}
          <div className="rounded-3xl bg-white/[0.04] p-6 transition-colors duration-300 hover:bg-white/[0.07]">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Address</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-300">
              Addis Ababa, Ethiopia
            </p>
          </div>

          {/* Brand */}
          <div className="flex flex-col items-center justify-center rounded-3xl bg-white/[0.04] p-6 transition-colors duration-300 hover:bg-white/[0.07]">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Shuufare</div>
            <img
              src="https://reg.g2gitsolutions.com/assets/shuufare%20logo.png"
              alt="Shuufare Logo"
              className="mt-3 h-14 w-auto object-contain brightness-110"
            />
            <p className="mt-3 text-xs text-slate-500">© {new Date().getFullYear()} All rights reserved</p>
          </div>
        </div>
      </div>
    </section>
  );
}