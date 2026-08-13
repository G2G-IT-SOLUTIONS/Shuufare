import {
  Zap,
  Shield,
  Wrench,
  Heart,
  Wallet,
  BriefcaseBusiness,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Benefits() {
  const { t } = useTranslation();

  const benefits = [
    {
      title: t("benefits.vehicleOwnership"),
      icon: Zap,
      accent: "bg-emerald-500",
      accentLight: "bg-emerald-50 text-emerald-600",
    },
    {
      title: t("benefits.vehicleInsurance"),
      icon: Shield,
      accent: "bg-cyan-500",
      accentLight: "bg-cyan-50 text-cyan-600",
    },
    {
      title: t("benefits.fleetManagement"),
      icon: Wrench,
      accent: "bg-violet-500",
      accentLight: "bg-violet-50 text-violet-600",
    },
    {
      title: t("benefits.companyEV"),
      icon: Heart,
      accent: "bg-amber-500",
      accentLight: "bg-amber-50 text-amber-600",
    },
    {
      title: t("benefits.microFinance"),
      icon: Wallet,
      accent: "bg-blue-500",
      accentLight: "bg-blue-50 text-blue-600",
    },
    {
      title: t("benefits.salaryEmployment"),
      icon: BriefcaseBusiness,
      accent: "bg-rose-500",
      accentLight: "bg-rose-50 text-rose-600",
    },
  ];

  return (
    <section
      id="benefits"
      className="relative overflow-hidden bg-white py-20 sm:py-24"
    >
      
      {/* Background accents */}
      <div
        className="pointer-events-none absolute -left-40 top-1/3 h-72 w-72 rounded-full bg-emerald-50/70 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-40 bottom-1/4 h-72 w-72 rounded-full bg-cyan-50/50 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          
          {/* Section heading */}
          <div className="max-w-xl">
            <p className="text-center text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-left lg:text-5xl">
              {t("benefits.title")}
            </p>

            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-amber-600 lg:mx-0" />

           
              <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                <span className="h-8 w-8 rounded-full border-2 border-white bg-emerald-500" />
                <span className="h-8 w-8 rounded-full border-2 border-white bg-cyan-500" />
                <span className="h-8 w-8 rounded-full border-2 border-white bg-violet-500" />
              </div>

              <span className="text-sm font-medium text-slate-600">
                {t(
                  "benefits.subtitle"
                )
                }
                <span className=" text-linear-warm ml-1">
                {t ("benefits.highlight")}.
              </span>
              </span>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={`${benefit.title}-${index}`}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                >
                  {/* Subtle hover glow */}
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full ${benefit.accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10`}
                    aria-hidden="true"
                  />

                  <div className="relative flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${benefit.accentLight} transition-transform duration-300 group-hover:scale-105`}
                    >
                      <Icon
                        className="h-5 w-5"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </div>

                    <span className="text-xs font-bold tracking-[0.2em] text-slate-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="relative mt-6 text-lg font-bold leading-7 text-slate-950 transition-colors duration-200 group-hover:text-emerald-700">
                    {benefit.title}
                  </h3>

                  <div className="mt-5 h-px w-8 bg-slate-200 transition-all duration-300 group-hover:w-12 group-hover:bg-slate-400" />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}