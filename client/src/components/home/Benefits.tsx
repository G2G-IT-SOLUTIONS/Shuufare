import { useState } from "react";
import {
  Zap,
  Shield,
  Wrench,
  Heart,
  Wallet,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";

export default function Benefits() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const benefits = [
    {
      title: t("benefits.vehicleOwnership"),
      icon: Zap,
    },
    {
      title: t("benefits.vehicleInsurance"),
      icon: Shield,
    },
    {
      title: t("benefits.fleetManagement"),
      icon: Wrench,
    },
    {
      title: t("benefits.companyEV"),
      icon: Heart,
    },
    {
      title: t("benefits.microFinance"),
      icon: Wallet,
    },
    {
      title: t("benefits.salaryEmployment"),
      icon: BriefcaseBusiness,
    },
  ];

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % benefits.length);
  };

  const previous = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + benefits.length) % benefits.length);
  };

  const benefit = benefits[current];
  const Icon = benefit.icon;

  return (
    <section
      id="benefits"
      className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-16">
          
          {/* Heading */}
          <div className="max-w-xl">
            <p className="text-center text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-left lg:text-5xl">
              {t("benefits.title")}
            </p>

            <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-amber-500 lg:mx-0" />

            <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
              <div className="flex -space-x-2">
                <span className="h-9 w-9 rounded-full border-2 border-white bg-emerald-500" />
                <span className="h-9 w-9 rounded-full border-2 border-white bg-cyan-500" />
                <span className="h-9 w-9 rounded-full border-2 border-white bg-violet-500" />
              </div>

              <span className="text-sm font-medium text-slate-600">
                {t("benefits.subtitle")}
                <span className="ml-1">
                  {t("benefits.highlight")}.
                </span>
              </span>
            </div>
          </div>

          {/* Large Slider */}
          <div className="relative w-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{
                  opacity: 0,
                  x: direction > 0 ? 70 : -70,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: direction > 0 ? -70 : 70,
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full"
              >
                <div className="relative flex min-h-[300px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-sm sm:min-h-[300px] sm:p-10 lg:min-h-[420px] lg:p-12">
                  
                  {/* Top */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50">
                      <Icon
                        className="h-7 w-7 text-slate-800"
                        strokeWidth={1.8}
                      />
                    </div>

                    <span className="text-sm font-semibold tracking-[0.2em] text-slate-300">
                      {String(current + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                      {benefit.title}
                    </h3>

                    <div className="mt-8 h-px w-16 bg-slate-300" />
                  </div>

                  {/* Bottom */}
                  <div className="flex items-center justify-between pt-8">
                    <div className="flex gap-1.5">
                      {benefits.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setDirection(index > current ? 1 : -1);
                            setCurrent(index);
                          }}
                          aria-label={`Go to benefit ${index + 1}`}
                          className={`h-1.5 rounded transition-all duration-300 ${
                            index === current
                              ? "w-8 bg-slate-900"
                              : "w-1.5 bg-slate-200 hover:bg-slate-400"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={previous}
                        aria-label="Previous benefit"
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:border-slate-400 hover:text-slate-950"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>

                      <button
                        onClick={next}
                        aria-label="Next benefit"
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white transition-all duration-200 hover:bg-slate-800"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}