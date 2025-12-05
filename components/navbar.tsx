"use client"

import type React from "react"

import { useState } from "react"
import { X, Globe, ChevronDown } from "lucide-react"
import { resetScrollProgress } from "@/components/scroll-progress"
import { useLanguage } from "@/contexts/LanguageContext"
import ContactModal from "./contact-modal"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const [rentalDropdownOpen, setRentalDropdownOpen] = useState(false)
  const [mobileRentalDropdownOpen, setMobileRentalDropdownOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    resetScrollProgress()
    window.scrollTo({ top: 0, behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  const navItems = [
    {
      label: "Аренды",
      dropdown: [
        { href: "#apartments", label: "Квартиры" },
        { href: "/cars", label: "Машины" },
        { href: "/scoots", label: "Мопеды" },
        { href: "#electric-bikes", label: "Электро байки" },
        { href: "#enduro", label: "Эндуро" },
        { href: "#snowmobiles", label: "Снегоходы" },
      ],
    },
    { href: "#partnership", label: "Партнерство" },
    { href: "#contacts", label: "Контакты" },
  ]

  const handleLanguageChange = (lang: "kz" | "ru" | "en") => {
    setLanguage(lang)
    setLanguageDropdownOpen(false)
  }

  return (
    <>
      <header className="fixed top-8 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg">
            <div className="relative w-full flex items-center justify-between px-4 py-3 sm:px-6 md:py-4 lg:px-6 xl:px-4 xl:py-4 2xl:px-8">
              <div className="flex-shrink-0">
                <a
                  href="#"
                  onClick={handleLogoClick}
                  className="flex items-center font-bold text-gray-900 hover:text-red-600 transition-colors text-lg sm:text-xl md:text-2xl"
                >
                  Dream Rent
                </a>
              </div>

              <nav className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <ul className="flex space-x-6 lg:space-x-8 xl:space-x-10">
                  {navItems.map((item, index) => (
                    <li key={index} className="relative">
                      {item.dropdown ? (
                        <div
                          className="relative"
                          onMouseEnter={() => setRentalDropdownOpen(true)}
                          onMouseLeave={() => setRentalDropdownOpen(false)}
                        >
                          <button className="text-sm lg:text-base font-medium transition-colors hover:text-red-600 whitespace-nowrap font-inter text-gray-900 flex items-center">
                            {item.label}
                            <ChevronDown className="w-4 h-4 ml-1" />
                          </button>

                          {rentalDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px] z-50">
                              {item.dropdown.map((subItem, subIndex) => (
                                <a
                                  key={subIndex}
                                  href={subItem.href}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                                >
                                  {subItem.label}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <a
                          href={item.href}
                          className="text-sm lg:text-base font-medium transition-colors hover:text-red-600 whitespace-nowrap font-inter text-gray-900"
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex items-center space-x-3 md:space-x-6 flex-shrink-0">
                <div className="hidden md:flex items-center space-x-6">
                  <div className="flex flex-col items-end">
                    <a
                      href="tel:+77079549722"
                      className="text-gray-900 font-semibold text-base hover:text-red-600 transition-colors"
                    >
                      +7 (707) 954-97-22
                    </a>
                    <div className="flex items-center space-x-2 mt-0">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium transition-colors hover:text-red-600 whitespace-nowrap font-inter text-gray-500">
                        {t("nav.callUs")}
                      </span>
                    </div>
                  </div>
                  <div className="hidden lg:block relative ml-8 mr-8">
                    <button
                      onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                      className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      aria-label="Выбрать язык"
                    >
                      <Globe className="w-5 h-5 text-gray-600" />
                    </button>

                    {languageDropdownOpen && (
                      <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[120px] z-50">
                        <button
                          onClick={() => handleLanguageChange("kz")}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center space-x-2 ${
                            language === "kz" ? "text-red-600 font-semibold" : "text-gray-700"
                          }`}
                        >
                          <span>🇰🇿</span>
                          <span>Қаз</span>
                        </button>
                        <button
                          onClick={() => handleLanguageChange("ru")}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center space-x-2 ${
                            language === "ru" ? "text-red-600 font-semibold" : "text-gray-700"
                          }`}
                        >
                          <span>🇷🇺</span>
                          <span>Рус</span>
                        </button>
                        <button
                          onClick={() => handleLanguageChange("en")}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center space-x-2 ${
                            language === "en" ? "text-red-600 font-semibold" : "text-gray-700"
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
                    className="text-gray-900 font-semibold text-base hover:text-red-600 transition-colors"
                  >
                    +7 (707) 954-97-22
                  </a>
                  <div className="flex items-center space-x-2 mt-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-500">{t("nav.callUs")}</span>
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="rounded-lg p-2 text-gray-700 lg:hidden bg-gray-100 hover:bg-gray-200 transition-colors"
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
        <div className="lg:hidden fixed inset-0 z-40 bg-white">
          <div className="flex flex-col h-full">
            <div className="pt-8">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-lg">
                  <div className="relative w-full flex items-center px-4 py-3 sm:px-6 md:py-4 lg:px-6 xl:px-4 xl:py-4 2xl:px-8">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                      <a
                        href="#"
                        onClick={handleLogoClick}
                        className="flex items-center text-xl sm:text-2xl font-bold text-gray-900"
                      >
                        Dream Rent
                      </a>
                    </div>

                    {/* Close button */}
                    <div className="ml-auto flex items-center space-x-3 md:space-x-4 flex-shrink-0">
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
                        aria-label="Закрыть меню"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <nav className="flex-1 pt-8">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <ul className="space-y-0">
                  {navItems.map((item, index) => (
                    <li key={index}>
                      {item.dropdown ? (
                        <div>
                          <button
                            onClick={() => setMobileRentalDropdownOpen(!mobileRentalDropdownOpen)}
                            className="w-full py-4 text-lg font-medium text-black font-inter flex items-center justify-between hover:text-red-600 transition-colors"
                          >
                            {item.label}
                            <ChevronDown
                              className={`w-5 h-5 transition-transform ${mobileRentalDropdownOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                          {mobileRentalDropdownOpen && (
                            <ul className="space-y-2 pb-2 pl-0">
                              {item.dropdown.map((subItem, subIndex) => (
                                <li key={subIndex}>
                                  <a
                                    href={subItem.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block py-2 text-base text-gray-600 transition-colors hover:text-red-600"
                                  >
                                    {subItem.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <a
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-4 text-lg font-medium text-black transition-colors hover:text-red-600 font-inter"
                        >
                          {item.label}
                        </a>
                      )}
                      {index < navItems.length - 1 && <div className="h-px bg-gray-200"></div>}
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-gray-200 mt-0">
                  <div className="flex items-center justify-center space-x-6">
                    <button
                      onClick={() => {
                        setLanguage("kz")
                        setMobileMenuOpen(false)
                      }}
                      className={`text-lg font-medium transition-colors hover:text-red-600 flex items-center space-x-2 ${
                        language === "kz" ? "text-red-600 font-semibold" : "text-gray-700"
                      }`}
                    >
                      <span>🇰🇿</span>
                      <span>Қаз</span>
                    </button>
                    <div className="w-px h-6 bg-gray-300"></div>
                    <button
                      onClick={() => {
                        setLanguage("ru")
                        setMobileMenuOpen(false)
                      }}
                      className={`text-lg font-medium transition-colors hover:text-red-600 flex items-center space-x-2 ${
                        language === "ru" ? "text-red-600 font-semibold" : "text-gray-700"
                      }`}
                    >
                      <span>🇷🇺</span>
                      <span>Рус</span>
                    </button>
                    <div className="w-px h-6 bg-gray-300"></div>
                    <button
                      onClick={() => {
                        setLanguage("en")
                        setMobileMenuOpen(false)
                      }}
                      className={`text-lg font-medium transition-colors hover:text-red-600 flex items-center space-x-2 ${
                        language === "en" ? "text-red-600 font-semibold" : "text-gray-700"
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
        </div>
      )}

      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </>
  )
}
