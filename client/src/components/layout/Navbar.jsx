import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ArrowRight,
  Globe,
  Menu,
  X,
} from 'lucide-react'
import logo from '../../assets/logo.png'

export default function Navbar() {
  const { t, i18n } = useTranslation()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navigationLinks = [
    {
      label: t('navbar.services'),
      href: '#benefits',
    },
    {
      label: t('navbar.contact'),
      href: '#cta',
    },
  ]

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const handleNationalIdRegistration = () => {
    const apiUrl = import.meta.env.VITE_API_URL

    if (!apiUrl) {
      console.error('VITE_API_URL is not configured')
      return
    }

    window.location.href = `${apiUrl}/auth/fayda`
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <header
      className={`
        sticky top-0 z-50
        transition-all duration-300
        ${
          scrolled
            ? 'border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl'
            : 'bg-white/75 backdrop-blur-xl'
        }
      `}
    >
      <nav
        className="
          mx-auto flex h-[76px] max-w-7xl
          items-center justify-between
          px-4 sm:px-6 lg:px-8
        "
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <a
          href="/"
          onClick={closeMobileMenu}
          className="
            flex shrink-0 items-center
            transition-transform duration-200
            hover:scale-[1.02]
          "
          aria-label="Shuufare home"
        >
          <img
            src={logo}
            alt="Shuufare"
            className="h-12 w-auto object-contain sm:h-14"
          />
        </a>

        {/* Desktop Navigation */}
        <div
          className="
            hidden lg:flex
            items-center
            rounded-full
            border border-slate-200
            bg-white/70
            p-1
            shadow-sm
          "
        >
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="
                rounded-full
                px-5 py-2
                text-sm font-medium
                text-slate-600
                transition-all duration-200
                hover:bg-slate-100
                hover:text-slate-950
              "
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">

          {/* Language */}
          <div
            className="
              flex items-center
              rounded-full
              border border-slate-200
              bg-white/80
              p-1
              shadow-sm
            "
          >
            <Globe className="ml-2 mr-1 h-4 w-4 text-slate-400" />

            <button
              type="button"
              aria-label="Switch to English"
              aria-pressed={i18n.language === 'en'}
              onClick={() => handleLanguageChange('en')}
              className={`
                rounded-full
                px-3 py-1.5
                text-xs font-bold
                transition-all duration-200
                ${
                  i18n.language === 'en'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }
              `}
            >
              EN
            </button>

            <button
              type="button"
              aria-label="Switch to Amharic"
              aria-pressed={i18n.language === 'am'}
              onClick={() => handleLanguageChange('am')}
              className={`
                rounded-full
                px-3 py-1.5
                text-xs font-bold
                transition-all duration-200
                ${
                  i18n.language === 'am'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }
              `}
            >
              አማ
            </button>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={handleNationalIdRegistration}
            className="
              group
              inline-flex items-center gap-2
              rounded-full
              bg-amber-500
              px-5 py-2.5
              text-sm font-semibold
              text-slate-950
              shadow-sm
              transition-all duration-200
              hover:-translate-y-0.5
              hover:bg-amber-400
              hover:shadow-lg
              active:translate-y-0
            "
          >
            {t('navbar.startApplication')}

            <ArrowRight
              className="
                h-4 w-4
                transition-transform duration-200
                group-hover:translate-x-0.5
              "
            />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="
            flex h-11 w-11
            items-center justify-center
            rounded-xl
            border border-slate-200
            bg-white
            text-slate-900
            shadow-sm
            transition-all duration-200
            hover:bg-slate-50
            lg:hidden
          "
          aria-label={
            mobileMenuOpen
              ? 'Close navigation menu'
              : 'Open navigation menu'
          }
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        className={`
          overflow-hidden
          border-t border-slate-200/80
          bg-white/95
          backdrop-blur-xl
          transition-all duration-300
          lg:hidden
          ${
            mobileMenuOpen
              ? 'max-h-[500px] opacity-100'
              : 'pointer-events-none max-h-0 opacity-0'
          }
        `}
      >
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">

          {/* Links */}
          <div className="space-y-1">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="
                  flex items-center justify-between
                  rounded-xl
                  px-4 py-3.5
                  text-sm font-medium
                  text-slate-700
                  transition-colors
                  hover:bg-slate-50
                  hover:text-slate-950
                "
              >
                {link.label}

                <ArrowRight className="h-4 w-4 text-slate-400" />
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-slate-200" />

          {/* Language */}
          <div
            className="
              flex items-center justify-between
              rounded-xl
              border border-slate-200
              bg-slate-50
              p-3
            "
          >
            <div className="flex items-center gap-2.5">
              <div
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-full
                  bg-white
                  text-slate-500
                  shadow-sm
                "
              >
                <Globe className="h-4 w-4" />
              </div>

              <span className="text-sm font-medium text-slate-700">
                {t('navbar.language')}
              </span>
            </div>

            <div
              className="
                flex rounded-full
                border border-slate-200
                bg-white
                p-1
              "
            >
              <button
                type="button"
                aria-pressed={i18n.language === 'en'}
                onClick={() => handleLanguageChange('en')}
                className={`
                  rounded-full
                  px-3 py-1.5
                  text-xs font-bold
                  transition-all
                  ${
                    i18n.language === 'en'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-500'
                  }
                `}
              >
                EN
              </button>

              <button
                type="button"
                aria-pressed={i18n.language === 'am'}
                onClick={() => handleLanguageChange('am')}
                className={`
                  rounded-full
                  px-3 py-1.5
                  text-xs font-bold
                  transition-all
                  ${
                    i18n.language === 'am'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-500'
                  }
                `}
              >
                አማ
              </button>
            </div>
          </div>

          {/* Mobile CTA */}
          <button
            type="button"
            onClick={handleNationalIdRegistration}
            className="
              group mt-4
              flex w-full
              items-center justify-center gap-2
              rounded-xl
              bg-amber-500
              px-5 py-3.5
              text-sm font-semibold
              text-slate-950
              shadow-sm
              transition-all duration-200
              hover:bg-amber-400
              hover:shadow-lg
            "
          >
            {t('navbar.startApplication')}

            <ArrowRight
              className="
                h-4 w-4
                transition-transform duration-200
                group-hover:translate-x-0.5
              "
            />
          </button>
        </div>
      </div>
    </header>
  )
}