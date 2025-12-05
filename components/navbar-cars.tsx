"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { X, Globe } from "lucide-react"
import { resetScrollProgress } from "@/components/scroll-progress"
import { useLanguage } from "@/contexts/LanguageContext"

export default function NavbarCars() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    resetScrollProgress()
    window.location.href = "/cars"
    setMobileMenuOpen(false)
  }

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      setMobileMenuOpen(false)
    }
  }

  const navItems = [
    { href: "#conditions", label: "Условия" },
    { href: "#reviews", label: "Отзывы" },
    { href: "#sublease", label: "Субаренда" },
    { href: "#contacts", label: "Контакты" },
  ]

  const handleLanguageChange = (lang: "kz" | "ru" | "en") => {
    setLanguage(lang)
    setLanguageDropdownOpen(false)
  }

  return (
    <>
      <header className="pt-8 pb-0 relative z-50 bg-[#0f0f12]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1a1a1f] rounded-2xl shadow-lg border border-gray-800">
            <div className="relative w-full flex items-center justify-between px-4 py-3 sm:px-6 md:py-4 lg:px-6 xl:px-4 xl:py-4 2xl:px-8">
              <div className="flex-shrink-0">
                <Link
                  href="/cars"
                  className="flex flex-col font-bold text-white leading-tight"
                  onClick={() => {
                    resetScrollProgress()
                    setMobileMenuOpen(false)
                  }}
                >
                  <img
                    src="https://alchinkaz.github.io/db-dream-rent/cars/kaz-dream-cars.svg"
                    alt="Kaz Dream Cars"
                    className="h-6 md:h-10 w-auto object-contain"
                  />
                </Link>
              </div>

              <nav className="hidden lg:block ml-12">
                <ul className="flex space-x-6 lg:space-x-8 xl:space-x-10">
                  {navItems.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.href}
                        onClick={(e) => handleAnchorClick(e, item.href)}
                        className="text-sm lg:text-base font-medium transition-colors hover:text-custom-gold-500 whitespace-nowrap font-inter text-gray-300"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex items-center space-x-3 md:space-x-6 flex-shrink-0 ml-auto">
                <div className="hidden md:flex items-center space-x-6">
                  <div className="flex flex-col items-end">
                    <a
                      href="tel:+77079549722"
                      className="text-white font-semibold text-base hover:text-custom-gold-500 transition-colors"
                    >
                      +7 (747) 333-90-97
                    </a>
                    <div className="flex items-center space-x-2 mt-0">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium whitespace-nowrap font-inter text-gray-400">
                        Звоните, мы в сети
                      </span>
                    </div>
                  </div>
                  <div className="hidden lg:block relative ml-8 mr-8">
                    <button
                      onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                      className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                      aria-label="Выбрать язык"
                    >
                      <Globe className="w-5 h-5 text-gray-400" />
                    </button>

                    {languageDropdownOpen && (
                      <div className="absolute top-12 right-0 bg-[#1a1a1f] rounded-lg shadow-lg border border-gray-700 py-2 min-w-[120px] z-50">
                        <button
                          onClick={() => handleLanguageChange("kz")}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-800 transition-colors flex items-center space-x-2 ${
                            language === "kz" ? "text-custom-gold-500 font-semibold" : "text-gray-300"
                          }`}
                        >
                          <span>🇰🇿</span>
                          <span>Қаз</span>
                        </button>
                        <button
                          onClick={() => handleLanguageChange("ru")}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-800 transition-colors flex items-center space-x-2 ${
                            language === "ru" ? "text-custom-gold-500 font-semibold" : "text-gray-300"
                          }`}
                        >
                          <span>🇷🇺</span>
                          <span>Рус</span>
                        </button>
                        <button
                          onClick={() => handleLanguageChange("en")}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-800 transition-colors flex items-center space-x-2 ${
                            language === "en" ? "text-custom-gold-500 font-semibold" : "text-gray-300"
                          }`}
                        >
                          <span>🇬🇧</span>
                          <span>Eng</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:hidden flex flex-col items-end">
                  <a
                    href="tel:+77079549722"
                    className="text-white font-semibold text-base hover:text-custom-gold-500 transition-colors"
                  >
                    +7 (747) 333-90-97
                  </a>
                  <div className="flex items-center space-x-2 mt-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium whitespace-nowrap font-inter text-gray-400">
                      Звоните, мы в сети
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="rounded-lg p-2 text-gray-300 lg:hidden bg-gray-800 hover:bg-gray-700 transition-colors"
                  aria-label="Меню"
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#0f0f12] pt-32">
          <nav className="flex-1">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <ul className="space-y-0">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      onClick={(e) => handleAnchorClick(e, item.href)}
                      className="block py-4 text-lg font-medium text-white transition-colors hover:text-custom-gold-500 font-inter border-b border-gray-800"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-gray-800 mt-0">
                <div className="flex items-center justify-center space-x-6">
                  <button
                    onClick={() => {
                      setLanguage("kz")
                      setMobileMenuOpen(false)
                    }}
                    className={`text-lg font-medium transition-colors hover:text-custom-gold-500 flex items-center space-x-2 ${
                      language === "kz" ? "text-custom-gold-500 font-semibold" : "text-gray-300"
                    }`}
                  >
                    <span>🇰🇿</span>
                    <span>Қаз</span>
                  </button>
                  <div className="w-px h-6 bg-gray-700"></div>
                  <button
                    onClick={() => {
                      setLanguage("ru")
                      setMobileMenuOpen(false)
                    }}
                    className={`text-lg font-medium transition-colors hover:text-custom-gold-500 flex items-center space-x-2 ${
                      language === "ru" ? "text-custom-gold-500 font-semibold" : "text-gray-300"
                    }`}
                  >
                    <span>🇷🇺</span>
                    <span>Рус</span>
                  </button>
                  <div className="w-px h-6 bg-gray-700"></div>
                  <button
                    onClick={() => {
                      setLanguage("en")
                      setMobileMenuOpen(false)
                    }}
                    className={`text-lg font-medium transition-colors hover:text-custom-gold-500 flex items-center space-x-2 ${
                      language === "en" ? "text-custom-gold-500 font-semibold" : "text-gray-300"
                    }`}
                  >
                    <span>🇬🇧</span>
                    <span>Eng</span>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
