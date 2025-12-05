"use client"
import { CarCard } from "@/components/car-card"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { carsData } from "@/lib/cars-data"
import { Phone } from "lucide-react"

const CarsPage = () => {
  const [activeCategory, setActiveCategory] = useState("Все")
  const [isVisible, setIsVisible] = useState(false)
  const carsRef = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("mobile")
  const [activeReviewSlide, setActiveReviewSlide] = useState(0)
  const reviewsCarouselRef = useRef<HTMLDivElement>(null)

  const carsArray = Object.entries(carsData).map(([id, car]) => ({
    id,
    ...car,
    price: car.pricing.day.price,
    image: car.images[0],
  }))

  // Extract unique categories from cars data
  const uniqueCategories = Array.from(new Set(carsArray.map((car) => car.category)))
  const categories = ["Все", ...uniqueCategories]

  const filteredCars = activeCategory === "Все" ? carsArray : carsArray.filter((car) => car.category === activeCategory)

  const conditionsData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]
  const reviewsData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (carsRef.current) {
      observer.observe(carsRef.current)
    }

    return () => {
      if (carsRef.current) {
        observer.unobserve(carsRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      if (width >= 1024) {
        setScreenSize("desktop")
      } else if (width >= 640) {
        setScreenSize("tablet")
      } else {
        setScreenSize("mobile")
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft
      const scrollWidth = carouselRef.current.scrollWidth
      const clientWidth = carouselRef.current.clientWidth
      const maxScroll = scrollWidth - clientWidth

      if (screenSize === "desktop") {
        const scrollRatio = scrollLeft / maxScroll
        const newIndex = scrollRatio > 0.5 ? 1 : 0
        setActiveSlide(newIndex)
      } else if (screenSize === "tablet") {
        const pageWidth = maxScroll / 2
        const newIndex = Math.round(scrollLeft / pageWidth)
        setActiveSlide(Math.min(newIndex, 2))
      } else {
        const cardWidth = clientWidth
        const newIndex = Math.round(scrollLeft / cardWidth)
        setActiveSlide(Math.min(newIndex, conditionsData.length - 1))
      }
    }
  }

  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth
      const clientWidth = carouselRef.current.clientWidth
      const maxScroll = scrollWidth - clientWidth

      if (screenSize === "desktop") {
        const targetScroll = index === 0 ? 0 : maxScroll
        carouselRef.current.scrollTo({
          left: targetScroll,
          behavior: "smooth",
        })
      } else if (screenSize === "tablet") {
        const pageWidth = maxScroll / 2
        carouselRef.current.scrollTo({
          left: pageWidth * index,
          behavior: "smooth",
        })
      } else {
        const cardWidth = clientWidth
        carouselRef.current.scrollTo({
          left: cardWidth * index,
          behavior: "smooth",
        })
      }
      setActiveSlide(index)
    }
  }

  const handleReviewsScroll = () => {
    if (reviewsCarouselRef.current) {
      const scrollLeft = reviewsCarouselRef.current.scrollLeft
      const scrollWidth = reviewsCarouselRef.current.scrollWidth
      const clientWidth = reviewsCarouselRef.current.clientWidth
      const maxScroll = scrollWidth - clientWidth

      if (screenSize === "desktop") {
        const scrollRatio = scrollLeft / maxScroll
        const newIndex = scrollRatio > 0.5 ? 1 : 0
        setActiveReviewSlide(newIndex)
      } else if (screenSize === "tablet") {
        const pageWidth = maxScroll / 2
        const newIndex = Math.round(scrollLeft / pageWidth)
        setActiveReviewSlide(Math.min(newIndex, 2))
      } else {
        const cardWidth = clientWidth
        const newIndex = Math.round(scrollLeft / cardWidth)
        setActiveReviewSlide(Math.min(newIndex, reviewsData.length - 1))
      }
    }
  }

  const scrollToReviewSlide = (index: number) => {
    if (reviewsCarouselRef.current) {
      const scrollWidth = reviewsCarouselRef.current.scrollWidth
      const clientWidth = reviewsCarouselRef.current.clientWidth
      const maxScroll = scrollWidth - clientWidth

      if (screenSize === "desktop") {
        const targetScroll = index === 0 ? 0 : maxScroll
        reviewsCarouselRef.current.scrollTo({
          left: targetScroll,
          behavior: "smooth",
        })
      } else if (screenSize === "tablet") {
        const pageWidth = maxScroll / 2
        reviewsCarouselRef.current.scrollTo({
          left: pageWidth * index,
          behavior: "smooth",
        })
      } else {
        const cardWidth = clientWidth
        reviewsCarouselRef.current.scrollTo({
          left: cardWidth * index,
          behavior: "smooth",
        })
      }
      setActiveReviewSlide(index)
    }
  }

  const totalPages = screenSize === "desktop" ? 2 : screenSize === "tablet" ? 3 : conditionsData.length
  const reviewsTotalPages = screenSize === "desktop" ? 2 : screenSize === "tablet" ? 3 : reviewsData.length

  return (
    <div className="min-h-screen bg-[#0f0f12]">
      <section className="min-h-screen flex items-end lg:items-end justify-center lg:justify-start bg-[#0f0f12] pb-32 lg:pb-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="font-rubik font-bold text-3xl md:text-4xl lg:text-6xl mb-4 lg:mb-8 text-white leading-tight">
              <span className="block">Аренда автомобилей</span>
              <span className="block">в Алматы</span>
            </h1>

            <p className="text-base md:text-lg text-gray-400 mb-8 font-medium max-w-xl">
              Широкий выбор авто. Бизнес-класс, премиум и эконом. Аренда от 15 000 ₸ в сутки
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/cars/select"
                className="w-full sm:w-auto px-8 py-3 bg-custom-gold-500 text-black rounded-lg font-semibold hover:bg-custom-gold-600 transition-colors text-center"
              >
                Выбрать автомобиль
              </Link>
              <Link
                href="/cars/sublease"
                className="w-full sm:w-auto px-8 py-3 bg-transparent border border-gray-600 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors text-center"
              >
                Сдать в субаренду
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cars section - existing code */}
      <section id="cars" ref={carsRef} className="py-8 md:py-12 bg-[#0f0f12] md:pt-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-custom-gold-500 text-black"
                    : "bg-[#1a1a1f] text-gray-400 hover:bg-[#252529] hover:text-white border border-gray-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <CarCard key={car.id} {...car} />
            ))}
          </div>

          {filteredCars.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">В этой категории пока нет автомобилей</p>
            </div>
          )}
        </div>
      </section>

      <section id="conditions" className="py-8 md:py-12 bg-[#0f0f12]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-white">Условия аренды</h2>

          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {conditionsData.map((condition, index) => (
              <div
                key={condition.id}
                className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
              >
                <div className="rounded-3xl p-8 flex flex-col justify-between min-h-64 bg-[#1a1a1f] text-white border border-gray-800">
                  <div className="text-5xl md:text-6xl font-bold text-gray-700 mb-4">0{index + 1}</div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-white">{condition.title}</h3>
                    <p className="text-base text-gray-400 font-medium">{condition.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeSlide === index ? "bg-custom-gold-500 w-8" : "bg-gray-600 hover:bg-gray-500 w-2.5"
                }`}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-[#0f0f12]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full aspect-video bg-[#1a1a1f] rounded-3xl border border-gray-800 mb-6"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#1a1a1f] rounded-3xl border border-gray-800 aspect-video"></div>
            <div className="bg-[#1a1a1f] rounded-3xl border border-gray-800 aspect-video"></div>
            <div className="bg-[#1a1a1f] rounded-3xl border border-gray-800 aspect-video"></div>
            <div className="bg-[#1a1a1f] rounded-3xl border border-gray-800 aspect-video"></div>
            <div className="bg-[#1a1a1f] rounded-3xl border border-gray-800 aspect-video"></div>
            <div className="bg-[#1a1a1f] rounded-3xl border border-gray-800 aspect-video"></div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-8 md:py-12 bg-[#0f0f12]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-white text-center lg:text-left">
            Отзывы наших клиентов
          </h2>

          <div
            ref={reviewsCarouselRef}
            onScroll={handleReviewsScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reviewsData.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
              >
                <div className="rounded-3xl bg-[#1a1a1f] border border-gray-800" style={{ aspectRatio: "9/16" }}></div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: reviewsTotalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToReviewSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeReviewSlide === index ? "bg-custom-gold-500 w-8" : "bg-gray-600 hover:bg-gray-500 w-2.5"
                }`}
                aria-label={`Перейти к отзыву ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Новая секция субаренда */}
      <section id="sublease" className="py-8 md:py-12 bg-[#0f0f12]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            <div className="hidden lg:flex aspect-video bg-[#1a1a1f] rounded-3xl border border-gray-800 self-stretch items-start"></div>

            {/* Right side - content */}
            <div className="flex flex-col justify-center lg:justify-start">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Хотите сдавать свою машину и зарабатывать каждый месяц?
              </h2>
              <p className="text-base sm:text-lg text-gray-400 mb-8">
                Мы найдем арендаторов и обеспечим стабильный доход без вашего участия.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-[#1a1a1f] border border-gray-800 rounded-2xl p-4 sm:p-6">
                  <p className="text-white font-semibold text-sm sm:text-base">
                    Доход от 300 000₸ до 1 500 000₸ в месяц
                  </p>
                </div>
                <div className="bg-[#1a1a1f] border border-gray-800 rounded-2xl p-4 sm:p-6">
                  <p className="text-white font-semibold text-sm sm:text-base">Мы берём всю работу на себя</p>
                </div>
                <div className="bg-[#1a1a1f] border border-gray-800 rounded-2xl p-4 sm:p-6">
                  <p className="text-white font-semibold text-sm sm:text-base">Договор и прозрачные условия</p>
                </div>
                <div className="bg-[#1a1a1f] border border-gray-800 rounded-2xl p-4 sm:p-6">
                  <p className="text-white font-semibold text-sm sm:text-base">Гарантия выплат</p>
                </div>
              </div>

              <Link
                href="#contacts"
                className="bg-custom-gold-500 hover:bg-custom-gold-600 text-black font-semibold py-3 px-8 rounded-lg transition-colors inline-block w-full sm:w-auto text-center"
              >
                Оставить заявку
              </Link>
            </div>

            {/* Mobile: Empty space shown below content */}
            <div className="lg:hidden aspect-video bg-[#1a1a1f] rounded-3xl border border-gray-800 mt-4"></div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-[#0f0f12]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-white">Часто задаваемые вопросы</h2>

          <div className="space-y-4">
            <details className="bg-[#1a1a1f] border border-gray-800 rounded-2xl p-6 cursor-pointer group">
              <summary className="font-semibold text-white text-lg flex items-center justify-between">
                Какие документы нужны?
                <svg
                  className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l5 5 5-5" />
                </svg>
              </summary>
              <p className="text-gray-400 mt-4">
                Для аренды автомобиля вам понадобится: удостоверение личности (паспорт или ID-карта), водительское
                удостоверение со стажем вождения от 2 лет, а также залог в размере от 50 000₸ до 200 000₸ в зависимости
                от класса автомобиля. Для иностранных граждан дополнительно требуется загранпаспорт.
              </p>
            </details>

            <details className="bg-[#1a1a1f] border border-gray-800 rounded-2xl p-6 cursor-pointer group">
              <summary className="font-semibold text-white text-lg flex items-center justify-between">
                Как считается время аренды?
                <svg
                  className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l5 5 5-5" />
                </svg>
              </summary>
              <p className="text-gray-400 mt-4">
                Время аренды считается посуточно — сутки начинаются с момента получения автомобиля. Например, если вы
                взяли машину в 14:00, то вернуть её нужно до 14:00 следующего дня. Минимальный срок аренды — 1 сутки.
                При аренде от 7 дней предоставляется скидка 10%, от 30 дней — 20%.
              </p>
            </details>

            <details className="bg-[#1a1a1f] border border-gray-800 rounded-2xl p-6 cursor-pointer group">
              <summary className="font-semibold text-white text-lg flex items-center justify-between">
                Можно ли выезжать за город?
                <svg
                  className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l5 5 5-5" />
                </svg>
              </summary>
              <p className="text-gray-400 mt-4">
                Да, выезд за пределы города разрешен по территории Казахстана без ограничений. Выезд за границу (Россия,
                Кыргызстан, Узбекистан) возможен только по предварительному согласованию и с оформлением дополнительной
                страховки. Обратите внимание: в стоимость аренды включен лимит 300 км/сутки, перепробег оплачивается
                отдельно.
              </p>
            </details>

            <details className="bg-[#1a1a1f] border border-gray-800 rounded-2xl p-6 cursor-pointer group">
              <summary className="font-semibold text-white text-lg flex items-center justify-between">
                Что если я опоздаю на возврат?
                <svg
                  className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l5 5 5-5" />
                </svg>
              </summary>
              <p className="text-gray-400 mt-4">
                Мы предоставляем бесплатный grace-период в 1 час. При задержке от 1 до 3 часов взимается 30% от суточной
                стоимости, свыше 3 часов — полная стоимость дополнительных суток. Рекомендуем заранее связаться с нами,
                если понимаете, что не успеваете — мы всегда найдём решение.
              </p>
            </details>

            <details className="bg-[#1a1a1f] border border-gray-800 rounded-2xl p-6 cursor-pointer group">
              <summary className="font-semibold text-white text-lg flex items-center justify-between">
                Что делать при аварии?
                <svg
                  className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l5 5 5-5" />
                </svg>
              </summary>
              <p className="text-gray-400 mt-4">
                В первую очередь убедитесь в своей безопасности и вызовите полицию для оформления ДТП. Затем сразу
                позвоните на нашу горячую линию — мы работаем 24/7. Не покидайте место происшествия и сделайте фото
                повреждений. Все наши автомобили застрахованы по КАСКО, поэтому при соблюдении правил ваша
                ответственность ограничена суммой франшизы.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-[#0f0f12]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1a1a1f] rounded-3xl p-8 md:p-12 text-center border border-gray-800">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold text-white mb-3">Готовы начать?</h2>
            <p className="text-base sm:text-lg text-gray-400 mb-8">Выберите автомобиль и забронируйте за 1 минуту.</p>
            <Link
              href="/cars/select"
              className="bg-custom-gold-500 hover:bg-custom-gold-600 text-black font-semibold py-3 px-8 rounded-lg transition-colors inline-block w-full sm:w-auto text-center"
            >
              Забронировать авто
            </Link>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-8 md:py-12 bg-[#0f0f12]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="bg-[#1a1a1f] rounded-3xl p-8 shadow-xl border border-gray-800 flex flex-col h-[360px]">
                <div className="flex flex-col justify-start mb-4">
                  <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-2xl font-bold text-white mb-2">
                    <img
                      src="https://alchinkaz.github.io/db-dream-rent/cars/kaz-dream-cars.svg"
                      alt="Kaz Dream Cars"
                      className="inline h-8 w-auto object-contain"
                    />
                  </h2>
                  <span className="text-base text-gray-500 mb-3">Мы в сети с 10:00 до 20:00</span>
                </div>

                <div className="space-y-4 flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-custom-gold-500 rounded-full flex items-center justify-center flex-shrink-0">
                      {/* Reduced strokeWidth to make icon thinner while keeping it filled */}
                      <Phone className="w-5 h-5 text-black fill-black" strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col">
                      <a
                        href="tel:+77079549722"
                        className="text-lg font-semibold text-white hover:text-[#fdd400] transition-colors"
                      >
                        +7 (747) 333-90-97
                      </a>
                      <span className="text-sm text-gray-500">Мобильный телефон</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-custom-gold-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <a
                        href="mailto:info@dreamrent.kz"
                        className="text-lg font-semibold text-white hover:text-[#fdd400] transition-colors"
                      >
                        info@dreamrent.kz
                      </a>
                      <span className="text-sm text-gray-500">Основная почта</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://go.2gis.com/0O8lH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center"
                  style={{
                    animation: "gentle-glow 3s ease-in-out infinite",
                  }}
                >
                  Перейти в 2ГИС
                </a>
              </div>
            </div>

            <div className="lg:col-span-3 order-1 lg:order-2">
              <div
                className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg flex items-center justify-center"
                style={{ height: "360px" }}
              >
                <span className="text-gray-500">Карта 2ГИС</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-[#0f0f12] border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base text-gray-500">
            Разработка сайта -{" "}
            <a
              href="https://wa.me/77710798939"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#fdd400] transition-colors duration-300"
            >
              Web Alchin
            </a>
          </p>
        </div>
      </footer>

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
    </div>
  )
}

export default CarsPage
