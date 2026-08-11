import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Do I need to own a car?',
    answer: 'No. Shuufare provides company-owned vehicles for approved drivers.',
  },
  {
    question: 'Do I need experience?',
    answer: 'A valid driving background helps, and training is provided during onboarding.',
  },
  {
    question: 'Is there an age limit?',
    answer: 'Applicants must be 21+. There is no specific upper age limit as long as you are fit to drive.',
  },
  {
    question: 'Does Shuufare hire women?',
    answer: 'Yes. Women are welcome to apply and are encouraged to join.',
  },
  {
    question: 'Can persons with disabilities apply?',
    answer: 'Yes. Persons with disabilities who can operate a vehicle safely can apply.',
  },
  {
    question: 'Do I need a driving license?',
    answer: 'Yes. A valid driving license is required for the application.',
  },
];

export default function FAQ() {
  return (
    <section className="relative bg-white py-24 sm:py-32">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-50/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          {/* Left Column */}
          <div className="relative">
            <div className="sticky top-24">
              
              <h2 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Frequently Asked Questions
              </h2>
                <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-teal-600" />

              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Everything you need to know about joining Shuufare.
              </p>

              <div className="mt-10 rounded-2xl border border-gray-950/80 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-emerald-50 p-2.5 text-emerald-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Still have questions?</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Reach out to us at{' '}
                      <a
                        href="mailto:info@g2gitsolutions.com"
                        className="font-medium text-emerald-600 hover:underline"
                      >
                        info@g2gitsolutions.com
                      </a>{' '}
                      or call{' '}
                      <a href="tel:8610" className="font-medium text-emerald-600 hover:underline">
                        8610
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-gray-950/70 bg-white transition-all duration-200 hover:border-slate-300 hover:shadow-sm open:border-emerald-200 open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5">
                  <span className="flex items-center gap-4 pr-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-xs font-mono font-medium text-slate-400 transition-colors group-open:bg-emerald-50 group-open:text-emerald-600">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-base font-medium text-slate-800 transition-colors group-open:text-emerald-700">
                      {faq.question}
                    </span>
                  </span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition duration-200 group-open:rotate-180 group-open:text-emerald-500" />
                </summary>
                <div className="px-6 pb-5">
                  <div className="ml-12 border-t border-slate-100 pt-4">
                    <p className="text-sm leading-relaxed text-slate-600">{faq.answer}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}