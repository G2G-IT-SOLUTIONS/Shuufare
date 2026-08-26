import {
  Rocket,
  Phone,
  Mail,
  MapPin,
  Send,
  ArrowUpRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";

export default function CTASection() {
  const { t } = useTranslation();

  const handleNationalIdRegistration = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    if (!apiUrl) {
      console.error("VITE_API_URL is not configured");
      return;
    }

    window.location.href = `${apiUrl}/auth/fayda`;
  };

  const latitude =9.005626;
  const longitude =38.746426;

 const openGoogleMaps = () => {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-black text-white"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute -left-48 top-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-48 bottom-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        {/* ================= CTA ================= */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-7 shadow-2xl shadow-black/30 sm:p-10 lg:p-12">
          {/* Decorative glow */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-amber-500/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 ring-1 ring-amber-500/20">
                  <Rocket className="h-6 w-6 text-amber-400" />
                </div>

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
                    Shuufare
                  </p>

                  <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                    {t("cta.title")}
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                    {t("cta.subtitle")}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleNationalIdRegistration}
              className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-amber-500 px-7 py-4 text-sm font-bold text-black shadow-xl shadow-amber-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-amber-400 hover:shadow-2xl hover:shadow-amber-500/30 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black sm:w-auto"
            >
              {t("cta.startApplication")}

              <Rocket className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* ================= INFORMATION CARDS ================= */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Contact */}
          <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/20 hover:bg-white/[0.05]">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-amber-400" />

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">
                {t("cta.contact")}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5">
                  <Phone className="h-4 w-4 text-slate-400" />
                </div>

                <span className="text-sm text-slate-300">
                  {t("cta.phone")}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>

                <span className="break-all text-sm text-slate-300">
                  {t("cta.email")}
                </span>
              </div>

              <a
                href="https://t.me/shuufare_eth"
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-center gap-3 rounded-xl py-1 text-sm font-semibold text-slate-300 transition-colors hover:text-white"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5">
                  <Send className="h-4 w-4 text-slate-400 transition-colors group-hover/link:text-amber-400" />
                </div>

                <span>{t("cta.telegram")}</span>

                <ArrowUpRight className="ml-auto h-4 w-4 text-slate-600 transition-all group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-amber-400" />
              </a>
            </div>
          </div>

          {/* Mission */}
          <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/20 hover:bg-white/[0.05]">
            <div className="flex items-center gap-2">
              <Rocket className="h-4 w-4 text-amber-400" />

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">
                {t("cta.empoweringDrivers")}
              </span>
            </div>

            <p className="mt-6 text-sm leading-7 text-slate-400">
              {t("cta.empoweringDriversDescription")}
            </p>
          </div>

          {/* Address */}
          <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/20 hover:bg-white/[0.05]">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-400" />

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
                {t("cta.address")}
              </span>
            </div>

            <p className="mt-6 min-h-[84px] text-sm leading-7 text-slate-400">
              {t("cta.addressText")}
            </p>

            <button
              onClick={openGoogleMaps}
              className="group/map mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-400 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-500 hover:text-white"
            >
              <MapPin className="h-4 w-4 transition-transform group-hover/map:-translate-y-0.5" />
              {t("cta.seeRoute")}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          {/* Brand */}
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-amber-500/10 blur-3xl" />

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
                Shuufare
              </p>

              <img
                src={logo}
                alt="Shuufare Logo"
                className="mx-auto mt-4 h-20 w-36 object-contain transition-transform duration-500 hover:scale-105"
              />

              <div className="mx-auto mt-4 h-px w-12 bg-white/10" />

              <p className="mt-4 text-xs text-slate-500">
                © {new Date().getFullYear()} {t("cta.copyright")}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom spacing / subtle divider */}
        <div className="mt-10 flex items-center justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>
    </section>
  );
}