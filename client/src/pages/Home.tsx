import {
  Users,
  Car,
  ShieldCheck,
  DollarSign,
  Truck,
  Briefcase,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Hero from "../components/home/Hero";
import Benefits from "../components/home/Benefits";
import Partners from "../components/home/Partners";
import QRRegistration from "../components/home/QRRegistration";
import CTASection from "../components/home/CTASection";

export default function Home() {
  const { t } = useTranslation();

  const eligibleGroups = [
    {
      text: t("home.yangoDriver"),
      icon: Car,
      color: "emerald",
    },
    {
      text: t("home.vehicleFinancing"),
      icon: DollarSign,
      color: "amber",
    },
    {
      text: t("home.insuranceCoverage"),
      icon: ShieldCheck,
      color: "blue",
    },
    {
      text: t("home.microFinance"),
      icon: DollarSign,
      color: "rose",
    },
    {
      text: t("home.fleetManagement"),
      icon: Truck,
      color: "indigo",
    },
    {
      text: t("home.salaryEmployment"),
      icon: Briefcase,
      color: "purple",
    },
  ];

  const colorVariants = {
    rose: {
      bg: "bg-rose-50",
      icon: "text-rose-600",
    },
    blue: {
      bg: "bg-blue-50",
      icon: "text-blue-600",
    },
    amber: {
      bg: "bg-amber-50",
      icon: "text-amber-600",
    },
    indigo: {
      bg: "bg-indigo-50",
      icon: "text-indigo-600",
    },
    emerald: {
      bg: "bg-emerald-50",
      icon: "text-emerald-600",
    },
    purple: {
      bg: "bg-purple-50",
      icon: "text-purple-600",
    },
  };

  return (
    <main className="bg-white text-slate-950">
      <Hero />

      <Benefits />

      {/* Who can apply */}
      <section
        id="who-can-apply"
        className="relative overflow-hidden border-t border-slate-100 bg-slate-50/70 py-8 sm:py-24"
      >
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex items-center justify-center rounded-2xl  text-yellow-600">
              <Users className="h-12 w-12" />
            </div>

            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              {t("home.whoCanApply")}
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              {t("home.whoCanApplyDescription")}
            </p>
          </div>

          {/* Grid */}
          <div className="mx-auto mt-12 grid max-w-5xl gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {eligibleGroups.map((item) => {
              const Icon = item.icon;
              const colors =
                colorVariants[item.color as keyof typeof colorVariants];

              return (
                <article
                  key={item.text}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colors.bg}`}
                    >
                      <Icon
                        className={`h-6 w-6 ${colors.icon}`}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="text-sm font-semibold leading-6 text-slate-900">
                      {item.text}
                    </h3>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <QRRegistration />
      <Partners />
      <CTASection />
    </main>
  );
}