"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Gauge, Fuel, CheckCircle, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { carsData } from "@/lib/cars-data"
import { normalizePhoneNumber } from "@/lib/phone-utils"
import { formatPrice } from "@/lib/price-utils"

interface BookingData {
  carId: string
  date: string
  time: string
  tariff: string
}

export default function CarBookingPage() {
  const router = useRouter()
  const pathname = usePathname()
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  })
  const [agreeToConditions, setAgreeToConditions] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Load booking data from localStorage on mount
  useEffect(() => {
    console.log("[v0] BookingPage mounted, pathname:", pathname)

    const savedData = localStorage.getItem("carBookingData")
    console.log("[v0] localStorage carBookingData:", savedData)

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData) as BookingData
        console.log("[v0] Parsed booking data:", parsed)
        setBookingData(parsed)
      } catch (e) {
        console.error("[v0] Failed to parse booking data:", e)
      }
    } else {
      console.log("[v0] No booking data found in localStorage")
    }
    setIsLoading(false)
  }, [pathname])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center">
        <div className="text-white">Загрузка...</div>
      </div>
    )
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen py-8 bg-[#0f0f12] flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Данные бронирования не найдены</h1>
          <Link href="/cars" className="text-red-500 hover:text-red-400">
            Вернуться к каталогу
          </Link>
        </div>
      </div>
    )
  }

  const car = carsData[bookingData.carId as keyof typeof carsData]

  if (!car) {
    return (
      <div className="min-h-screen py-8 bg-[#0f0f12] flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Автомобиль не найден</h1>
          <Link href="/cars" className="text-red-500 hover:text-red-400">
            Вернуться к каталогу
          </Link>
        </div>
      </div>
    )
  }

  const startDate = bookingData.date
    ? (() => {
        const [year, month, day] = bookingData.date.split("-").map(Number)
        const date = new Date(year, month - 1, day)
        date.setHours(0, 0, 0, 0)
        return date
      })()
    : null

  const selectedTariff = bookingData.tariff ? car.pricing[bookingData.tariff as keyof typeof car.pricing] : null
  const rentalPrice = selectedTariff ? selectedTariff.price : 0
  const insurancePrice = car.insurance || 0
  const totalPrice = rentalPrice + insurancePrice

  const getEndDateTime = () => {
    if (!selectedTariff || !startDate || !bookingData.time) return { date: "", time: "" }

    const endDate = new Date(startDate)

    if (bookingData.tariff === "day") {
      endDate.setDate(endDate.getDate() + 1)
    } else if (bookingData.tariff === "twoDays") {
      endDate.setDate(endDate.getDate() + 2)
    } else if (bookingData.tariff === "week") {
      endDate.setDate(endDate.getDate() + 7)
    }

    const [hours, minutes] = bookingData.time.split(":").map(Number)
    endDate.setHours(hours, minutes, 0, 0)

    return {
      date: format(endDate, "dd.MM.yyyy", { locale: ru }),
      time: bookingData.time,
    }
  }

  const endDateTime = getEndDateTime()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone) {
      alert("Пожалуйста, заполните имя и номер телефона")
      return
    }

    if (!agreeToConditions) {
      alert("Пожалуйста, ознакомьтесь с условиями аренды")
      return
    }

    try {
      const normalizedPhone = normalizePhoneNumber(formData.phone)

      await fetch("/api/send-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleType: "car", // Added to identify as car booking
          motorcycleName: car.name,
          name: formData.name,
          phone: normalizedPhone,
          date: startDate ? format(startDate, "dd.MM.yyyy", { locale: ru }) : "",
          time: bookingData.time,
          tariff: bookingData.tariff,
          totalPrice: formatPrice(totalPrice),
        }),
      })

      // Clear localStorage after successful booking
      localStorage.removeItem("carBookingData")
      setIsSuccess(true)
    } catch (error) {
      console.error("Error submitting booking:", error)
      alert("Ошибка при отправке заявки. Пожалуйста, попробуйте позже.")
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen py-8 bg-[#0f0f12] flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl p-8 border border-gray-800 bg-[#1a1a1f] shadow-sm text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4 mx-auto" />
            <h1 className="font-rubik font-bold text-3xl text-white mb-2">Спасибо за вашу заявку!</h1>
            <p className="text-gray-400 mb-4">
              Мы получили вашу заявку на бронь {car.name}. Свяжемся с вами в ближайшее время.
            </p>
            <p className="text-gray-400 mb-8">Или напишите нам в WhatsApp для более быстрого ответа:</p>

            <a
              href="https://wa.me/77079549722"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 h-14 bg-green-500 hover:bg-green-600 font-bold text-lg text-white rounded-lg transition-colors mb-6"
            >
              <MessageCircle className="w-5 h-5" />
              Написать в WhatsApp
            </a>

            <button
              onClick={() => router.push("/cars")}
              className="block w-full text-gray-400 hover:text-white transition-colors"
            >
              Вернуться к автомобилям
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 bg-[#0f0f12]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад</span>
        </button>

        <div className="rounded-xl p-8 border border-gray-800 bg-[#1a1a1f] shadow-sm">
          <div className="mb-6 pb-4 border-b border-gray-800">
            <h1 className="font-rubik font-bold text-3xl text-white mb-3">{car.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Gauge className="w-5 h-5 text-gray-500" />
                <span className="text-gray-300">{car.power}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Fuel className="w-5 h-5 text-gray-500" />
                <span className="text-gray-300">{car.volume}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Стоимость аренды:</span>
              <span className="text-white font-semibold">{formatPrice(rentalPrice)} ₸</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Страховка:</span>
              <span className="text-white font-semibold">{formatPrice(insurancePrice)} ₸</span>
            </div>

            <div className="border-t border-gray-800 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Старт аренды:</span>
                <span className="text-white">
                  {startDate ? format(startDate, "dd.MM.yyyy", { locale: ru }) : "Не выбрано"} |{" "}
                  {bookingData.time || "Не выбрано"}
                </span>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Окончание аренды:</span>
                <span className="text-white">
                  {endDateTime.date} | {endDateTime.time}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-lg">Итого:</span>
                <span className="text-white font-bold text-lg">{formatPrice(totalPrice)} ₸</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <input
                type="text"
                placeholder="Имя *"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-4 py-4 rounded-lg border border-gray-700 bg-[#0f0f12] text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>

            <div>
              <input
                type="tel"
                placeholder="Телефон *"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full px-4 py-4 rounded-lg border border-gray-700 bg-[#0f0f12] text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>

            <div className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-lg">
              <input
                type="checkbox"
                id="conditions"
                checked={agreeToConditions}
                onChange={(e) => setAgreeToConditions(e.target.checked)}
                className="w-5 h-5 mt-1 text-red-600 rounded cursor-pointer"
              />
              <label htmlFor="conditions" className="flex-1 cursor-pointer">
                <span className="text-gray-300">
                  Я ознакомился с{" "}
                  <Link
                    href="/rental-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-400 underline"
                  >
                    условиями аренды
                  </Link>
                </span>
              </label>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full h-14 bg-red-600 hover:bg-red-700 font-bold text-lg text-white rounded-lg transition-colors"
            disabled={!formData.name || !formData.phone || !agreeToConditions}
          >
            Заказать
          </Button>
        </div>
      </div>
    </div>
  )
}
