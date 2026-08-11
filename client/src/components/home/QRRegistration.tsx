import { QrCode, Smartphone } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function QRRegistration() {
  const { t } = useTranslation();

  return (
    <section
      id="register"
      className="border-t border-slate-100 bg-slate-50/50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <QrCode className="h-8 w-8 font-extrabold" strokeWidth={2} />
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            {t("qrRegistration.title")}
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            {t("qrRegistration.description")}
          </p>
        </div>

        {/* QR registration card */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-2">
            {/* QR */}
            <div className="flex items-center justify-center bg-slate-950 p-8 sm:p-12">
              <div className="w-full max-w-sm">
                <div className="mb-5 flex items-center justify-center gap-2 text-sm font-medium text-white">
                  <Smartphone className="h-4 w-4 text-amber-400" />
                  <span>
                    {t("qrRegistration.scanWithCamera")}
                  </span>
                </div>

                <div className="mx-auto w-full max-w-xs rounded-2xl bg-white p-4 shadow-xl">
                  <img
                    src="https://reg.g2gitsolutions.com/assets/SHUFARE.png"
                    alt={t("qrRegistration.scanToRegister")}
                    className="block h-auto w-full rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="flex items-center p-8 sm:p-12 lg:p-14">
              <div className="max-w-lg">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
                  {t("qrRegistration.scanToRegister")}
                </p>

                <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  {t("qrRegistration.scanCodeAndContinue")}
                </h3>

                <p className="mt-4 text-base leading-7 text-slate-600">
                  {t("qrRegistration.qrCodeDescription")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}