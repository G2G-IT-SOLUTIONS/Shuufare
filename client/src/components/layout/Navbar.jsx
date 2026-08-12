import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, Menu, X, Globe } from 'lucide-react'
import logo from '../../assets/logo.png'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navigationLinks = [
    { label: t('navbar.services'), href: '#benefits' },
    { label: t('navbar.contact'), href: '#cta' },
  ]

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const handleNationalIdRegistration = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    if (!apiUrl) {
      console.error("VITE_API_URL is not configured");
      return;
    }

    window.location.href = `${apiUrl}/auth/fayda`;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-gray-500/60 bg-white/85 shadow-lg shadow-slate-950/3 backdrop-blur-2xl'
          : 'bg-white/60 backdrop-blur-xl'
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <a
          href="/"
          className="group flex items-center gap-3 rounded-full px-1 py-1 transition-all duration-300 hover:scale-[1.03]"
          aria-label="Shuufare home"
        >      
        <img
             src={logo}
            alt="Shuufare logo"
            className="h-16 w-auto max-w-none rounded-2xl  transition-all duration-300 group-hover:brightness-110 "
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-0.5 rounded-full border border-gray-500 bg-slate-50/80 p-1 backdrop-blur-sm lg:flex">
          {navigationLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-white hover:text-slate-950 hover:shadow-sm"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 rounded-full border border-gray-500 bg-white/90 p-1 shadow-sm backdrop-blur-sm ">
            <Globe className="ml-2 h-3.5 w-3.5 text-slate-400" />
            <button
              type="button"
              aria-pressed={i18n.language === 'en'}
              onClick={() => handleLanguageChange('en')}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-all duration-300 ${
                i18n.language === 'en'
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              aria-pressed={i18n.language === 'am'}
              onClick={() => handleLanguageChange('am')}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-all duration-300 ${
                i18n.language === 'am'
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              አማ
            </button>
          </div>

          {/* CTA Button */}
          <button 
          type="button"
          onClick={handleNationalIdRegistration}
            className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-black shadow-lg shadow-emerald-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-600/30 border border-amber-500"
          >
            {t('navbar.startApplication')}
            <ChevronDown className="h-4 w-4 -rotate-90 opacity-80" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-500 transition-all duration-300 lg:hidden ${
            mobileMenuOpen
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
              : 'border-gray-500 bg-white text-slate-900 shadow-sm hover:bg-slate-50'
          }`}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <div className="relative h-5 w-5">
            <X className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${mobileMenuOpen ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`} />
            <Menu className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${mobileMenuOpen ? '-rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-navigation"
        className={`border-t border-gray-500/60 bg-white/98 px-4  backdrop-blur-2xl transition-all duration-400 ease-out lg:hidden ${
          mobileMenuOpen ? 'max-h-150 opacity-100 pb-5' : 'pointer-events-none max-h-0 overflow-hidden opacity-0'
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3">
          <div className="grid gap-0.5 rounded-3xl border border-gray-500/80 bg-slate-50/70 p-2">
            {navigationLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-white hover:text-slate-950 hover:shadow-sm"
                style={{ animationDelay: `${i * 50}ms` }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 rounded-3xl border border-gray-500/80 bg-white p-3">
            <div className="flex items-center gap-2.5 text-sm font-medium text-slate-500">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100/50">
                <Globe className="h-4 w-4" />
              </span>
              {t('navbar.language')}
            </div>
            <div className="flex items-center rounded-full border border-gray-500/80 bg-slate-50 p-1">
              <button
                type="button"
                aria-pressed={i18n.language === 'en'}
                onClick={() => handleLanguageChange('en')}
                className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-all duration-300 ${
                  i18n.language === 'en'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                aria-pressed={i18n.language === 'am'}
                onClick={() => handleLanguageChange('am')}
                className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-all duration-300 ${
                  i18n.language === 'am'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                አማ
              </button>
            </div>
          </div>

          <a
            href="/register"
            className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-2xl  shadow-lg shadow-emerald-600/20 transition-all duration-200 hover:shadow-xl bg-yellow-500 px-6 py-3 text-sm font-semibold text-black hover:-translate-y-0.5 hover:shadow-yellow-600/30"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('navbar.startApplication')}
            <ChevronDown className="h-4 w-4 -rotate-90 opacity-80" />
          </a>
        </div>
      </div>
    </header>
  )
}
