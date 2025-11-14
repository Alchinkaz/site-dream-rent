"use client"
import Navbar from "@/components/navbar"
import ScrollProgress from "@/components/scroll-progress"
import BookingForm from "@/components/booking-form"
import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import { ImageGallery } from "@/components/image-gallery"

import { useLanguage } from "@/contexts/LanguageContext"
import { translations } from "@/lib/translations"

export default function Home() {
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false)
  const [currentReview, setCurrentReview] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [currentWorkImage, setCurrentWorkImage] = useState(0)
  const [isWorkImageVisible, setIsWorkImageVisible] = useState(true)

  const [galleryOpen, setGalleryOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const workImages = ["/our-works.jpg", "/work-1.jpg", "/work-2.jpg", "/work-3.jpg", "/work-4.jpg", "/work-5.jpg"]

  const openGallery = (index = 0) => {
    setCurrentImageIndex(index)
    setGalleryOpen(true)
  }

  const closeGallery = () => {
    setGalleryOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % workImages.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + workImages.length) % workImages.length)
  }

  const reviews = [
    {
      id: 1,
      name: "Алматы Аренда",
      text: "Отличная платформа для размещения объявлений. Сотрудничаем уже полгода по направлению квартир и машин. CRM система очень удобная, все заявки приходят мгновенно.",
      fullText:
        "Отличная платформа для размещения объявлений. Сотрудничаем уже полгода по направлению квартир и машин. CRM система очень удобная, все заявки приходят мгновенно.",
      date: "17 декабря 2024",
      rating: 5,
      source: "Партнер",
      image: "Image 1",
    },
    {
      id: 2,
      name: "Moto Rent Astana",
      text: "Разместили парк мопедов и электро байков. Клиенты идут постоянно, комиссия адекватная. Поддержка помогает решать любые вопросы быстро.",
      fullText:
        "Разместили парк мопедов и электро байков. Клиенты идут постоянно, комиссия адекватная. Поддержка помогает решать любые вопросы быстро.",
      date: "12 декабря 2024",
      rating: 5,
      source: "Партнер",
      image: "Image 2",
    },
    {
      id: 3,
      name: "Enduro Kazakhstan",
      text: "Сотрудничество по эндуро и снегоходам превзошло ожидания. Аналитика показывает рост бронирований на 40% за первый месяц работы.",
      fullText:
        "Сотрудничество по эндуро и снегоходам превзошло ожидания. Аналитика показывает рост бронирований на 40% за первый месяц работы.",
      date: "8 декабря 2024",
      rating: 5,
      source: "Партнер",
      image: "Image 3",
    },
    {
      id: 4,
      name: "Luxury Cars Almaty",
      text: "Премиум автомобили арендуются через платформу отлично. Интеграция с платежными системами работает безупречно, деньги приходят вовремя.",
      fullText:
        "Премиум автомобили арендуются через платформу отлично. Интеграция с платежными системами работает безупречно, деньги приходят вовремя.",
      date: "5 декабря 2024",
      rating: 5,
      source: "Партнер",
      image: "Image 4",
    },
    {
      id: 5,
      name: "Apartment Plus",
      text: "Размещаем квартиры в трех городах. CRM позволяет управлять всем из одного места, календарь бронирований очень удобный.",
      fullText:
        "Размещаем квартиры в трех городах. CRM позволяет управлять всем из одного места, календарь бронирований очень удобный.",
      date: "1 декабря 2024",
      rating: 5,
      source: "Партнер",
      image: "Image 5",
    },
    {
      id: 6,
      name: "Winter Adventure",
      text: "Партнерство по снегоходам оказалось очень выгодным. Зимний сезон принес много клиентов, техподдержка всегда на связи.",
      fullText:
        "Партнерство по снегоходам оказалось очень выгодным. Зимний сезон принес много клиентов, техподдержка всегда на связи.",
      date: "28 ноября 2024",
      rating: 5,
      source: "Партнер",
      image: "Image 6",
    },
  ]

  const { language } = useLanguage()
  const t = (key: string) => {
    const keys = key.split(".")
    let value: any = translations[language]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault()
        const id = target.getAttribute("href")?.substring(1)
        const element = document.getElementById(id || "")
        if (element) {
          const navbarHeight = document.querySelector("header")?.clientHeight || 0
          const y = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight
          window.scrollTo({ top: y, behavior: "smooth" })
        }
      }
    }

    const reviewInterval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length)
        setIsVisible(true)
      }, 300)
    }, 4000)

    const workImageInterval = setInterval(() => {
      setIsWorkImageVisible(false)
      setTimeout(() => {
        setCurrentWorkImage((prev) => (prev + 1) % workImages.length)
        setIsWorkImageVisible(true)
      }, 300)
    }, 4000)

    document.addEventListener("click", handleAnchorClick)

    return () => {
      document.removeEventListener("click", handleAnchorClick)
      clearInterval(reviewInterval)
      clearInterval(workImageInterval)
    }
  }, [reviews.length, workImages.length])

  const openBookingForm = () => {
    setIsBookingFormOpen(true)
  }

  const closeBookingForm = () => {
    setIsBookingFormOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <Navbar onBookingClick={openBookingForm} />

      <section
        className="min-h-screen relative flex items-center justify-center pt-32 pb-8 sm:pb-12 md:pb-16"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 lg:p-16 min-h-[470px] border border-white/20">
            {/* Empty hero block */}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="prices" className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {/* Квартиры Card */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="aspect-[4/3] overflow-hidden bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-lg">Квартиры</span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Квартиры</h3>
                <p className="text-sm text-gray-600 mb-4">Люксовые аппартаменты по всему Казахстану</p>
                <button className="mt-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200">
                  Смотреть предложения
                </button>
              </div>
            </div>

            {/* Машины Card */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="aspect-[4/3] overflow-hidden bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-lg">Машины</span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Машины</h3>
                <p className="text-sm text-gray-600 mb-4">Широкий выбор автомобилей для любых целей</p>
                <button className="mt-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200">
                  Смотреть предложения
                </button>
              </div>
            </div>

            {/* Мопеды Card */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="aspect-[4/3] overflow-hidden bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-lg">Мопеды</span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Мопеды</h3>
                <p className="text-sm text-gray-600 mb-4">Удобный транспорт для городских поездок</p>
                <a href="/scoots" className="mt-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 text-center block">
                  Смотреть предложения
                </a>
              </div>
            </div>

            {/* Электро байки Card */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="aspect-[4/3] overflow-hidden bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-lg">Электро байки</span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Электро байки</h3>
                <p className="text-sm text-gray-600 mb-4">Экологичный и современный вид транспорта</p>
                <button className="mt-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200">
                  Смотреть предложения
                </button>
              </div>
            </div>

            {/* Эндуро Card */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="aspect-[4/3] overflow-hidden bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-lg">Эндуро</span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Эндуро</h3>
                <p className="text-sm text-gray-600 mb-4">Мотоциклы для бездорожья и приключений</p>
                <button className="mt-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200">
                  Смотреть предложения
                </button>
              </div>
            </div>

            {/* Снегоходы Card */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="aspect-[4/3] overflow-hidden bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-lg">Снегоходы</span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Снегоходы</h3>
                <p className="text-sm text-gray-600 mb-4">Идеальный вариант для зимних развлечений</p>
                <button className="mt-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200">
                  Смотреть предложения
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section id="partnership" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-3 space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Партнерство</h2>
              <p className="text-base text-gray-700 leading-relaxed">
                Предлагаем выгодные партнерские условия для размещения ваших объявлений аренды на нашей платформе. Мы
                предоставляем специальную CRM систему для управления арендой, которая позволяет автоматизировать процесс
                бронирования.
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                Ваши клиенты получают удобный доступ к каталогу через мобильное приложение и веб-платформу, а вы
                сэкономите время на обработку заявок благодаря автоматическому распределению бронирований.
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                Наша аналитика показывает, что партнеры увеличивают объем бронирований в среднем на 35-40% в первый месяц
                сотрудничества, так как платформа объединяет спрос со всего Казахстана.
              </p>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-gray-200 rounded-2xl overflow-hidden h-[480px] flex flex-col justify-between w-full p-6">
                <span className="text-gray-400 text-xl">Сотрудничество</span>
                <button
                  onClick={() => window.open("https://wa.me/77079549722", "_blank")}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                >
                  Начать сотрудничество
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Works Section */}
      <section id="works" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start mb-12">
            <div className="lg:col-span-3 mx-auto lg:mx-0">
              <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 text-center lg:text-left max-w-2xl">
                <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-lg mr-2">
                  {t("works.experienceBadge")}
                </span>
                {t("works.title")}
              </h2>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-red-600 rounded-2xl p-6">
                <div className="grid grid-cols-2 gap-6 text-center relative">
                  <div className="flex flex-col items-center">
                    <div className="text-2xl md:text-3xl font-bold text-white mb-2">500+</div>
                    <p className="text-sm text-white leading-tight">Активных объявлений</p>
                  </div>

                  <div className="absolute left-1/2 top-2 bottom-2 w-px bg-white transform -translate-x-1/2"></div>

                  <div className="flex flex-col items-center">
                    <div className="text-2xl md:text-3xl font-bold text-white mb-2">150+</div>
                    <p className="text-sm text-white leading-tight">Довольных партнеров</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3">
              <div
                className="bg-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity aspect-video lg:h-[400px] lg:aspect-auto flex items-center justify-center"
                onClick={() => openGallery(currentWorkImage)}
              >
                <img
                  src={workImages[currentWorkImage] || "/placeholder.svg"}
                  alt="Примеры наших работ - нажмите для просмотра галереи"
                  className="w-full h-full object-cover"
                  style={{ opacity: isWorkImageVisible ? 1 : 0, transition: "opacity 0.3s ease-in-out" }}
                />
              </div>
            </div>

            <div id="reviews" className="lg:col-span-2">
              <div className="rounded-2xl p-6 h-[400px] flex flex-col bg-gray-100">
                <div className="flex-grow flex flex-col justify-between">
                  <div className="mb-10">
                    <p
                      className="text-lg text-gray-900 mb-4 leading-relaxed h-40"
                      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s ease-in-out" }}
                    >
                      {reviews[currentReview].fullText}
                    </p>
                  </div>

                  <div className="mt-10">
                    <p
                      className="font-semibold text-gray-900"
                      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s ease-in-out" }}
                    >
                      {reviews[currentReview].name}
                    </p>
                    <div
                      className="flex items-end justify-between"
                      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s ease-in-out" }}
                    >
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="ml-2 text-sm text-gray-500">{reviews[currentReview].date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col h-[360px]">
                <div className="flex justify-start">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 hover:text-red-600 transition-colors">
                    Dream Rent
                  </h2>
                </div>

                <div className="h-8"></div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <a
                        href="tel:+77079549722"
                        className="text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors"
                      >
                        +7 (707) 954-97-22
                      </a>
                      <span className="text-sm text-gray-500">{t("contacts.mobilePhone")}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        <path d="M12 10a2 2 0 11-4 0 2 2 0 014 0zm0-6a2 2 0 11-4 0 2 2 0 014 0zm0 12a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <a
                        href="mailto:info@dreamrent.kz"
                        className="text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors"
                      >
                        info@dreamrent.kz
                      </a>
                      <span className="text-sm text-gray-500">{t("contacts.mainEmail")}</span>
                    </div>
                  </div>
                </div>

                <div className="h-8"></div>

                <button
                  disabled
                  className="w-full text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 opacity-50 cursor-not-allowed"
                  style={{ backgroundColor: "#21c45d" }}
                >
                  {t("contacts.viewIn2GIS")}
                </button>
              </div>
            </div>

            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg h-[360px] flex items-center justify-center">
                <span className="text-gray-400 text-2xl">Карта</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingForm isOpen={isBookingFormOpen} onClose={closeBookingForm} />

      {/* Fixed WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/77079549722"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          style={{
            animation: "gentle-glow 3s ease-in-out infinite",
          }}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </a>
      </div>

      {/* CSS styles for gentle pulse animation */}
      <style jsx>{`
        @keyframes gentle-glow {
          0%, 100% {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 0 0 0 rgba(34, 197, 94, 0.4);
          }
          50% {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 0 0 0 8px rgba(34, 197, 94, 0.1);
          }
        }
      `}</style>

      <ImageGallery
        images={workImages}
        isOpen={galleryOpen}
        currentIndex={currentImageIndex}
        onClose={closeGallery}
        onNext={nextImage}
        onPrevious={previousImage}
      />

      <footer className="py-4 bg-white mb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base text-gray-500">
            {t("footer.websiteDevelopment")} -{" "}
            <a
              href="https://wa.me/77710798939"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-red-600 transition-colors duration-300"
            >
              Web Alchin
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
