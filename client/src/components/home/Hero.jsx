import heroImage from "../../assets/hero.png";
import heroMobileImage from "../../assets/hero_mobile.png";
import nidLogo from "../../assets/nid-logo.png";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  const handleNationalIdRegister = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    if (!apiUrl) {
      console.error("VITE_API_URL is not configured");
      return;
    }

    window.location.href = `${apiUrl}/auth/fayda`;
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-slate-950 text-white"
      aria-labelledby="hero-title"
    >
      {/* Mobile background */}
      <div
        className="absolute -mt-32 inset-0 bg-cover bg-center bg-no-repeat lg:hidden"
        style={{
          backgroundImage: `url(${heroMobileImage})`,
        }}
        aria-hidden="true"
      />

      {/* Desktop background */}
      <div
        className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat bg-fixed lg:block"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
        aria-hidden="true"
      />

      {/* Top and bottom dark overlay
      <div
        className="absolute inset-0 bg-linear-to-b from-black/90 via-transparent to-black/90"
        aria-hidden="true"
      />
 */}
      {/* Bottom fade 
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black to-transparent"
        aria-hidden="true"
      />
*/}
      {/* Decorative glow */}
      <div
        className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Main hero content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full flex-col items-center px-6 text-center sm:px-8 lg:px-12 -mt-50">

        {/* Heading + Description */}
        <div className="flex w-full max-w-4xl flex-1 flex-col items-center justify-center pb-32">
          {/* Main heading */}
          <h1
            id="hero-title"
            className="max-w-4xl text-3xl font-bold leading-[1.08] text-gray-900 tracking-tight sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl"
          >
            {t("hero.title")}
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-900 sm:text-lg sm:leading-8 lg:text-xl">
            {t("hero.description")}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="absolute bottom-10 left-0 right-0 mx-auto flex w-full flex-col items-center justify-center gap-4 px-6 sm:bottom-12 sm:flex-row">
          {/* Register with Fayda */}
          <button
            type="button"
            onClick={handleNationalIdRegister}
            className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-amber-500 px-7 py-4 text-sm font-bold text-slate-950 shadow-2xl shadow-black/30 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-slate-400 active:translate-y-0 sm:text-base"
            aria-label={t(
              "hero.registerWithNationalId",
              "Register with National ID"
            )}
          >
            <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-md">
              <img
                src={nidLogo}
                alt="National ID Logo"
                className="h-7 w-7 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </span>

            <span>{t("hero.registerWithNationalId")}</span>

            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3 10a1 1 0 011-1h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L14.586 11H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Learn More */}
          <a
            href="#how-it-works"
            className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/25 bg-white px-7 py-4 text-sm font-semibold text-black backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/40 focus:outline-none focus:ring-0 focus:ring-white focus:ring-offset-1 focus:ring-offset-slate-500 active:translate-y-0 sm:text-base"
          >
            {t("hero.learnMore")}
          </a>
        </div>
      </div>
    </section>
  );
}