"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  motorcycle: {
    name: string
    year: number
    category: string
    helmet: string
    deposit: number
    pricing: Record<string, { price: number; time: string }>
  }
  bookingData: {
    date?: Date
    time: string
    tariff: string
  }
}

export function BookingModal({ isOpen, onClose, motorcycle, bookingData }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    // email: "", // Удаляем email из состояния формы
  })

  // Блокируем прокрутку фона при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  const selectedTariff = bookingData.tariff ? motorcycle.pricing[bookingData.tariff] : null
  const totalPrice = selectedTariff ? selectedTariff.price : 0

  // Вычисляем время окончания аренды (добавляем часы к времени начала)
  const getEndTime = () => {
    if (!selectedTariff || !bookingData.time) return ""

    const startHour = Number.parseInt(bookingData.time.split(":")[0])
    const tariffHours = selectedTariff.time.includes("час") ? Number.parseFloat(selectedTariff.time.split(" ")[0]) : 24 // если день, то 24 часа

    const endHour = startHour + tariffHours
    const endTime = `${Math.floor(endHour).toString().padStart(2, "0")}:${((endHour % 1) * 60).toString().padStart(2, "0")}`

    return endTime
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // Здесь будет логика отправки заявки
    console.log("Booking data:", { motorcycle, bookingData, formData })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      onClick={(e) => {
        // Закрываем модальное окно при клике на фон
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="w-full max-w-lg rounded-2xl relative bg-white max-h-[90vh] overflow-hidden shadow-xl">
        {/* Scrollable content with hidden scrollbar */}
        <div
          className="overflow-y-auto p-8 max-h-[90vh]"
          style={{
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE and Edge
          }}
          css={{
            "&::-webkit-scrollbar": {
              display: "none", // Chrome, Safari, Opera
            },
          }}
        >
          {/* Close Button (removed) */}
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-rubik font-bold text-3xl text-gray-900 mb-4">Бронирование</h1>

            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                {motorcycle.category}
              </span>
            </div>

            <h2 className="font-rubik font-bold text-xl text-gray-900">
              {motorcycle.name.toUpperCase()}, {motorcycle.year}
            </h2>
          </div>

          {/* Booking Details */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Шлем:</span>
              <span className="text-gray-900">1 {motorcycle.helmet}</span>
            </div>

            <div className="flex justify-between items-start">
              <span className="text-gray-700">Депозит:</span>
              <div className="text-right">
                <div className="text-gray-900 font-semibold">{motorcycle.deposit.toLocaleString()} ₸</div>
                <div className="text-gray-500 text-sm">(Оплачивается в момент выдачи)</div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Старт аренды:</span>
                <span className="text-gray-900">
                  {bookingData.date ? format(bookingData.date, "dd.MM.yyyy", { locale: ru }) : "Не выбрано"} |{" "}
                  {bookingData.time || "Не выбрано"}
                </span>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Окончание аренды:</span>
                <span className="text-gray-900">
                  {bookingData.date ? format(bookingData.date, "dd.MM.yyyy", { locale: ru }) : "Не выбрано"} |{" "}
                  {getEndTime()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Стоимость аренды:</span>
                <span className="text-gray-900 font-semibold">{totalPrice.toLocaleString()} ₸</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-bold text-lg">Итого:</span>
                <span className="text-gray-900 font-bold text-lg">{totalPrice.toLocaleString()} ₸</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4 mb-6">
            <div>
              <input
                type="text"
                placeholder="Имя *"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-4 py-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>

            <div>
              <input
                type="tel"
                placeholder="Телефон *"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full px-4 py-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>

            {/* Email field (removed) */}
          </div>

          {/* Order Button */}
          <Button
            onClick={handleSubmit}
            className="w-full h-14 bg-red-600 hover:bg-red-700 font-bold text-lg text-white rounded-lg transition-colors"
            disabled={!formData.name || !formData.phone} // Обновляем условие disabled
          >
            Заказать
          </Button>
        </div>
      </div>
    </div>
  )
}
