import { Handshake } from "lucide-react";
import { useTranslation } from "react-i18next";

import awashBank from "../../assets/awash-bank.png";
import yango from "../../assets/YANGO.png";
import g2gLogo from "../../assets/g2g-logo.png";

const partners = [
  {
    name: "AWASH BANK",
    logo: awashBank,
  },
  {
    name: "YANGO",
    logo: yango,
  },
  {
    name: "G2G IT SOLUTIONS",
    logo: g2gLogo,
  },
];

export default function Partners() {
  const { t } = useTranslation();

  return (
    <section
      id="partners"
      className="border-t border-slate-100 bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <Handshake className="h-6 w-6" strokeWidth={2} />
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
            {t("partners.partners")}
          </p>

          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            {t("partners.title")}
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            {t("partners.description")}
          </p>
        </div>

        {/* Partners */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="group flex min-h-32 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-2">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-12 max-w-12 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <span className="text-sm font-semibold text-slate-800">
                  {partner.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}