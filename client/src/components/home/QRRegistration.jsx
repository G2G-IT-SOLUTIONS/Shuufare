import { QrCode, Smartphone } from 'lucide-react'

export default function QRRegistration() {
  return (
    <section id="register" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-500/10">
            <QrCode className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Scan to Register
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Use your phone to start the registration process instantly.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-4xl border border-slate-200 bg-slate-50 shadow-sm shadow-slate-950/5">
          <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="flex items-center justify-center bg-slate-950 p-8 text-white sm:p-10">
              <div className="w-full max-w-sm rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-center shadow-2xl shadow-black/15 backdrop-blur-sm">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                  <Smartphone className="h-4 w-4" />
                  Scan with Camera
                </div>
                <img
                  src="https://reg.g2gitsolutions.com/assets/SHUFARE.png"
                  alt="Scan to Register"
                  className="mx-auto h-auto w-full max-w-[18rem] rounded-2xl bg-white p-4 shadow-lg shadow-black/10"
                />
              </div>
            </div>

            <div className="flex items-center justify-center p-8 sm:p-10">
              <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-600">
                  Scan to Register
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                  Scan the code and continue on your phone.
                </h3>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  The QR code opens the registration flow instantly, keeping the process simple and mobile-friendly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
