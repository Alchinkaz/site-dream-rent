"use client"

import { useState } from "react"
import { MotorcycleCard } from "@/components/motorcycle-card"
import Link from "next/link"

const motorcycles = [
  {
    id: "samurai",
    name: "SAMURAI",
    year: 2024,
    price: 6500,
    image: "https://alchinkaz.github.io/db-dream-rent/scoots/samurai/samurai-1.jpg",
    power: "90 км/ч",
    volume: "150 см³",
    available: true,
    brand: "SAMURAI",
    category: "Мопед",
    shortDescription: "Узкий, быстрый, универсальный. Для города и трассы.",
    description:
      "Оснащён мощным 150 см³ двигателем, выдающим 9.0 л.с. — лёгкий, резкий и надёжный. Развивает скорость до 90 км/ч, идеально подходит как для города, так и для трассы. Благодаря автоматической коробке передач (вариатору) — управлять просто и удобно, даже для новичков. Самурай отличается улучшенной подвеской и устойчивостью — езда мягкая, управляемость отличная даже на неровных дорогах.",
  },
  {
    id: "m8",
    name: "M8",
    year: 2024,
    price: 5500,
    image: "https://alchinkaz.github.io/db-dream-rent/scoots/m8/m8-1.jpg",
    power: "95 км/ч",
    volume: "150 см³",
    available: true,
    brand: "M8",
    category: "Мопед",
    shortDescription: "Лёгкий, манёвренный. Лучший выбор для новичков.",
    description:
      "Современный M8 — это сочетание стиля, мощности и комфорта. Двигатель 157QMJ, 150 см³, мощностью 9.5 л.с., развивает скорость до 95 км/ч. Автоматическая трансмиссия (вариатор) обеспечивает плавность хода и лёгкость управления. Благодаря усиленной раме и обновлённой подвеске, M8 уверенно чувствует себя и на городских улицах, и на подъёмах.",
  },
  {
    id: "maxi",
    name: "MAXI",
    year: 2024,
    price: 6000,
    image: "https://alchinkaz.github.io/db-dream-rent/scoots/maxi/maxi-1.jpg",
    power: "90 км/ч",
    volume: "150 см³",
    available: true,
    brand: "MAXI",
    category: "Мопед",
    shortDescription: "Больше и устойчивее. Удобен для ежедневных поездок по городу.",
    description:
      "Мопед оснащён надёжным двигателем 157QMJ объёмом 150 см³, мощностью 9.5 л.с., развивающим скорость до 90 км/ч. Автоматическая вариаторная трансмиссия обеспечивает лёгкость управления — никаких переключений передач, просто наслаждайтесь поездкой! Отличный крутящий момент как на низких, так и на средне-высоких оборотах делает этот мопед идеальным для городской среды.",
  },
  {
    id: "maxi-sport",
    name: "MAXI SPORT",
    year: 2024,
    price: 7000,
    image: "https://alchinkaz.github.io/db-dream-rent/scoots/maxi/maxi-sport-1.jpg",
    power: "100 км/ч",
    volume: "150 см³",
    available: true,
    brand: "MAXI SPORT",
    category: "Мопед",
    shortDescription: "Усиленные тормоза + LED-фары. Мощнее и современнее.",
    description:
      "Спортивная версия MAXI SPORT — это тот же надёжный двигатель 157QMJ, 150 см³, мощностью 9.5 л.с., но с улучшенной управляемостью и безопасностью. Максимальная скорость — до 95 км/ч. На данной модели установлены гидравлические тормоза и яркие LED-фары, что повышает комфорт и безопасность при езде как днём, так и ночью.",
  },
  {
    id: "honda-dio",
    name: "Honda Dio",
    year: 2024,
    price: 5000,
    image: "https://alchinkaz.github.io/db-dream-rent/scoots/honda-dio/hondadio1.jpg",
    power: "55 км/ч",
    volume: "50 см³",
    available: true,
    brand: "Honda Dio",
    category: "Мопед",
    shortDescription: "Экономичный 50cc. Идеален для начинающих и город поездок.",
    description:
      "Honda Dio оснащён надёжным 50 см³ двигателем — экономичный, уверенный и идеально подходит для ежедневных поездок. Развивает скорость до 55 км/ч, легко держится в городском потоке. Благодаря автоматической коробке (вариатору) управление максимально простое — идеально для новичков.",
  },
  {
    id: "peda-hornet",
    name: "Peda Hornet",
    year: 2024,
    price: 6500,
    image: "https://alchinkaz.github.io/db-dream-rent/scoots/peda-hornet/peda-hornet-1.jpg",
    power: "105 км/ч",
    volume: "150–180 см³",
    available: true,
    brand: "Hornet",
    category: "Мопед",
    shortDescription: "Спортивный дизайн, отличная подвеска. Для активной езды.",
    description:
      "Peda Hornet оснащён надёжным 150–180 см³ 4-тактным двигателем — динамичный, уверенный и отлично подходит для активной езды. Развивает скорость до 90–105 км/ч, легко держит городской поток и уверенно чувствует себя на трассе.",
  },
]

const whyChooseData = [
  {
    id: 1,
    title: "Быстрее, чем такси",
    subtitle: "Экономьте время в городских пробках — мопед проезжает туда, где застревает трафик",
    icon: "⚡",
  },
  {
    id: 2,
    title: "Дешевле, чем каршеринг",
    subtitle: "Начиная с 5 000 ₸ в сутки — стабильная цена без скрытых комиссий",
    icon: "💰",
  },
  {
    id: 3,
    title: "Паркуется везде",
    subtitle: "Не нужно искать место парковки — припаркуйтесь за 5 секунд на любом удобном месте",
    icon: "🅿️",
  },
  {
    id: 4,
    title: "Расход всего 2–3 л/100 км",
    subtitle: "Минимальные затраты на топливо — экономия топлива, как у скутера, но мощнее",
    icon: "⛽",
  },
  {
    id: 5,
    title: "Оформление — 2 минуты",
    subtitle: "Паспорт и водительское удостоверение — быстро, просто, без лишних документов",
    icon: "⏱️",
  },
]

const benefitsData = [
  {
    id: 1,
    title: "Без депозита",
    subtitle: "Платите только аренду и страховку. Никаких скрытых сборов и залогов — прозрачная цена от первого дня.",
  },
  {
    id: 2,
    title: "Шлем бесплатно",
    subtitle: "Перчатки по желанию. Безопасность — наш приоритет. Получите качественный шлем при каждой аренде.",
  },
  {
    id: 3,
    title: "Скидка 10%",
    subtitle: "При брони сегодня. Забронируйте прямо сейчас и получите специальное предложение на любой мопед.",
  },
  {
    id: 4,
    title: "Скидка 15%",
    subtitle: "При аренде от 3 дней. Долгосрочная аренда выгоднее — чем дольше едите, тем больше экономите.",
  },
]

const howItWorksData = [
  {
    id: 1,
    title: "Приезжаете к нам или оформляете бронь",
    shortTitle: "Выбор и бронирование",
    subtitle:
      "Выберите удобный способ — посетите наш офис или сделайте бронирование онлайн за несколько минут через сайт. Вся информация у вас под рукой.",
  },
  {
    id: 2,
    title: "Паспорт + права A/A1 или B",
    shortTitle: "Проверка документов",
    subtitle:
      "Подготовьте необходимые документы — это займёт всего несколько минут проверки. Требуется только паспорт и права категории A, A1 или B.",
  },
  {
    id: 3,
    title: "Страховка — 6 000 ₸",
    shortTitle: "Оформление страховки",
    subtitle:
      "Защита вашего спокойствия — полная страховка включена в стоимость. Покрывает все основные случаи, вы едите спокойно и безопасно.",
  },
  {
    id: 4,
    title: "Подписываем договор → выдача мопеда → можно ехать",
    shortTitle: "Подписание и выдача",
    subtitle:
      "Быстрое оформление — всё просто и прозрачно. После подписания договора вы получаете мопед и можете начать свою поездку в течение минут.",
  },
]

const targetAudienceData = [
  {
    id: 1,
    title: "Курьеры",
    subtitle: "Быстрая доставка без пробок и высоких расходов на топливо",
  },
  {
    id: 2,
    title: "Жители Алматы",
    subtitle: "Удобный способ перемещения по городу каждый день",
  },
  {
    id: 3,
    title: "Туристы",
    subtitle: "Исследуйте город и окрестности в своём темпе",
  },
]

const rentalTermsData = [
  {
    id: 1,
    title: "Возврат до 18:00",
    subtitle: "Верните мопед до 18:00 в день окончания аренды. Удобный график для планирования вашего дня.",
  },
  {
    id: 2,
    title: "Обслуживание каждые 4 дня",
    subtitle: "Бесплатное техническое обслуживание каждые 4 дня аренды. Гарантируем исправность мопеда.",
  },
  {
    id: 3,
    title: "Нет скрытых платежей",
    subtitle: "Честно фиксируем состояние при выдаче и возврате. Прозрачные условия без неожиданностей.",
  },
  {
    id: 4,
    title: "Техническая проблема? Заменим мопед",
    subtitle: "При любой неисправности заменим мопед на исправный. Ваша поездка не будет прервана.",
  },
]

export default function ScootsPage() {
  const filteredMotorcycles = motorcycles
  const [isDateOpen, setIsDateOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setIsDateOpen(false)
  }

  const formatDateDisplay = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative flex items-center bg-white pt-16 md:pt-8 lg:pt-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-first lg:order-first">
              <h1 className="font-rubik font-bold text-3xl md:text-4xl lg:text-6xl mb-4 lg:mb-8 text-black leading-tight">
                <span className="block">Аренда мопедов</span>
                <span className="block">в Алматы</span>
                <span className="block">от 5 000 ₸/сутки</span>
              </h1>

              <p className="text-base md:text-lg text-gray-600 mb-8 font-medium">
                Без депозита. Быстрое оформление. Шлем включён
              </p>

              <button className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors w-full md:w-auto text-center">
                Забронировать мопед
              </button>
            </div>

            <div className="hidden lg:flex justify-center">
              <img
                src="https://alchinkaz.github.io/db-dream-rent/scoots/mopedy-hero.png"
                alt="Мопеды для аренды"
                className="w-full max-w-none h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-16 text-center lg:text-left text-black hidden">
            Почему это удобно
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseData.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="rounded-3xl p-8 flex flex-col justify-between min-h-80 bg-gray-100 text-black"
              >
                <h3 className="text-2xl md:text-3xl font-bold">{item.title}</h3>
                <p className="text-base text-gray-700 font-medium">{item.subtitle}</p>
              </div>
            ))}

            <div className="rounded-3xl p-8 flex flex-col justify-between min-h-80 bg-gray-100 text-black lg:col-span-1">
              <h3 className="text-2xl md:text-3xl font-bold">{whyChooseData[3].title}</h3>
              <p className="text-base text-gray-700 font-medium">{whyChooseData[3].subtitle}</p>
            </div>

            <div className="rounded-3xl p-8 flex flex-col justify-between min-h-80 bg-red-600 text-white lg:col-span-2">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{whyChooseData[4].title}</h3>
                <p className="text-base text-white font-medium mb-8">{whyChooseData[4].subtitle}</p>
              </div>
              <button className="w-full md:w-auto px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                Забронировать мопед
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="motorcycles" className="py-8 md:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-16 text-center text-black">Наши мопеды</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMotorcycles.slice(0, 6).map((motorcycle) => (
              <MotorcycleCard key={motorcycle.id} {...motorcycle} />
            ))}
          </div>

          <div className="mt-8 md:mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {benefitsData.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl p-8 flex flex-col justify-between min-h-64 bg-gray-100 text-black"
                >
                  <h3 className="text-2xl md:text-3xl font-bold">{item.title}</h3>
                  <p className="text-base text-gray-700 font-medium">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-16 text-center text-black">Как это работает?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-3xl p-8 flex flex-col justify-between min-h-80 bg-red-600 text-white lg:col-span-2 relative">
              <div className="hidden lg:block absolute top-8 right-8 text-5xl md:text-6xl font-bold text-red-400">
                01
              </div>
              <div className="lg:hidden flex flex-col h-full">
                <div className="text-5xl font-bold text-red-400 mb-4">01</div>
                <div className="flex-1"></div>
                <h3 className="text-lg font-bold">Выбираете мопед</h3>
              </div>
              <div className="hidden lg:block">
                <h3 className="text-2xl md:text-3xl font-bold">Выбираете мопед</h3>
              </div>
            </div>

            {howItWorksData.map((item, index) => (
              <div
                key={item.id}
                className="rounded-3xl p-8 flex flex-col justify-between min-h-80 bg-gray-100 text-black"
              >
                <div className="text-5xl md:text-6xl font-bold text-gray-300 mb-4">0{index + 2}</div>

                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">{item.shortTitle}</h3>
                  <p className="text-base text-gray-700 font-medium">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-16 text-center text-black">Для кого подходит?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetAudienceData.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl p-8 flex flex-col justify-between min-h-80 bg-gray-100 text-black"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-center">{item.title}</h3>
                <p className="text-base text-gray-700 font-medium text-center">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-16 text-center text-black">Условия Аренды</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {rentalTermsData.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl p-8 flex flex-col justify-between min-h-64 bg-gray-100 text-black"
              >
                <h3 className="text-2xl md:text-3xl font-bold">{item.title}</h3>
                <p className="text-base text-gray-700 font-medium">{item.subtitle}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-base text-gray-700">
              Ознакомиться со всеми{" "}
              <Link href="/rental-conditions" className="text-red-600 hover:underline font-semibold transition-all">
                условиями аренды
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Added new CTA section before contacts */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-100 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Готовы начать?</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-8">Выберите мопед и забронируйте за 1 минуту.</p>
            <button
              onClick={(e) => e.preventDefault()}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-block"
            >
              Забронировать мопед
            </button>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-8 md:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col h-[360px]">
                <div className="flex flex-col justify-start mb-4">
                  <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-2xl font-bold text-gray-900 mb-2">
                    <span className="hover:text-red-600 transition-colors">Kaz Dream </span>
                    <span className="bg-red-600 text-white px-2 py-1 rounded">Scoots</span>
                  </h2>
                  <span className="text-base text-gray-500 mb-3">Мы в сети с 10:00 до 20:00</span>
                </div>

                <div className="space-y-4 flex-1">
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
                      <span className="text-sm text-gray-500">Мобильный телефон</span>
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
                      <span className="text-sm text-gray-500">Основная почта</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://go.2gis.com/0O8lH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center"
                >
                  Перейти в 2ГИС
                </a>
              </div>
            </div>

            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg" style={{ height: "360px" }}>
                <iframe
                  id="map_494271676"
                  frameBorder="0"
                  width="100%"
                  height="100%"
                  src="https://makemap.2gis.ru/widget?data=eJw1kF1vgjAUhv9LdynZKlSgJF4QGB-OEcAsfixeKHQdG1hSC06M_30Ft540OTnve07ePFfAeEE4KXzCaiJ4SU7Aer8CcWkIsIBH9qLlBCig4awhXIz6FeSsYlzqDx8qlCV1UYpq2Fiqnh4-Z5ftyhOhF38dVAzz83wuLQU55bxsRMmO0pgE9iQJYpjXuN32s2izZjQLFtVmBembGncHLesTB_dFsOgOdT6R_TmhzMxdI_2OfRtG67QrHAgjm8KoTzvhPA0zETsTGIV0_As3bbFjwsjNqPCjcNA2IY2X9vnVtSliLyh0TAo3QUax78CIp6177nIXDYH78FiQH2BN4f-7KYDeQV0GDH-UElYehfTnTMIsj3sxQjT0RxNrhmYqSHtUVWjOtJ3cLwtg6Rjddgqo903CTuUdyBVUewGsuxfrhjE1kWFgXQHVII_XEDaRimYahNpUxmOsluFm8qgEy6pq9UlItR2ngrfk9guCqZJm"
                  sandbox="allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"
                  title="2GIS Map"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-4 bg-white mb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base text-gray-500">
            Разработка сайта -{" "}
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
    </div>
  )
}
