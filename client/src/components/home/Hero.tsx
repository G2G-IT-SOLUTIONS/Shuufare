import heroImage from "../../assets/hero.png";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-white"
      style={{
        backgroundImage: `
          linear-gradient(
            180deg,
            rgba(2, 6, 23, 0.75) 0%,
            rgba(2, 6, 23, 0.65) 40%,
            rgba(15, 23, 42, 0.85) 100%
          ),
          url(${heroImage})
        `,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-emerald-900/20 via-transparent to-slate-950/30" />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
          Drive Your{" "}
          <span className="text-emerald-400">
            Future
          </span>
          !
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
          Shuufare provides company-owned vehicles, steady income,
          insurance, and long-term support for people looking for
          reliable work.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">

          <a
            href="#register"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-slate-100"
          >
            <img
              src="https://reg.g2gitsolutions.com/assets/nid-logo.png"
              alt="National ID Logo"
              className="h-6 w-6 object-contain"
            />

            Register with National ID
          </a>


          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
          >
            Learn More
          </a>

        </div>

      </div>
    </section>
  );
}