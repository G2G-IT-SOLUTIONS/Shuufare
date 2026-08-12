import {
  Rocket,
  Phone,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from '../../assets/logo.png'

export default function CTASection() {
  const { t } = useTranslation();
  const handleNationalIdRegistration = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    if (!apiUrl) {
      console.error("VITE_API_URL is not configured");
      return;
    }

    window.location.href = `${apiUrl}/auth/fayda`;  
  }

  return (
    <section 
    id="cta"
    className="relative overflow-hidden bg-slate-950 text-white">
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-40 bottom-1/4 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-12">
        {/* Main CTA */}
        <div className="rounded-3xl border border-white/5 p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-amber-500">
                <Rocket className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {t("cta.title")}
                </h2>

                <p className="mt-3 text-base leading-7 text-slate-400 sm:text-lg">
                  {t("cta.subtitle")}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 lg:mt-0 lg:shrink-0">
            <button
              onClick= {handleNationalIdRegistration}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-xl hover:shadow-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-950 sm:w-auto"
            >
          
              {t("cta.startApplication")}

              <Rocket className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Contact / information */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Contact */}
          <div className="rounded-2xl border border-white/5 p-6 transition-colors duration-300  ">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-amber-500" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500">
                {t("cta.contact")}
              </span>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="h-4 w-4 shrink-0 text-slate-500" />
                <span>{t("cta.phone")}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="h-4 w-4 shrink-0 text-slate-500" />
                <span>{t("cta.email")}</span>
              </div>

              <a
                href="https://t.me/shuufare_eth"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-[#0088cc] px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#0077b5] hover:shadow-lg hover:shadow-[#0088cc]/20"
              >
                <Send className="h-4 w-4" />
                <span>{t("cta.telegram")}</span>
              </a>
            </div>
          </div>

          {/* Mission */}
          <div className="rounded-2xl border border-white/5 p-6 transition-colors duration-300  ">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500">
              {t("cta.empoweringDrivers")}
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-300">
              {t("cta.empoweringDriversDescription")}
            </p>
          </div>

          {/* Address */}
          <div className="rounded-2xl border border-white/5  p-6 transition-colors duration-300 ">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-amber-500" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500">
                {t("cta.address")}
              </span>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-300">
              {t("cta.addressText")}
            </p>
          </div>

          {/* Brand */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/3 p-6 text-center transition-colors duration-300  ">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500">
              Shuufare
            </div>

            <img
              src={logo}
              alt="Shuufare Logo"
              className="mt-4 h-24 w-40 object-contain transition-transform duration-300 hover:scale-105"
            />

            <p className="mt-4 text-xs text-slate-500">
              © {new Date().getFullYear()} {t("cta.copyright")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}