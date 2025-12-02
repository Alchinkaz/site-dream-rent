"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { normalizePhoneNumber } from "@/lib/phone-utils"
import { Gauge, Settings, CheckCircle, MessageCircle } from 'lucide-react'
import Link from "next/link"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  motorcycle: {
    name: string
    year: number
    category: string
    helmet: string
    deposit: number
    insurance?: number
    pricing: Record<string, { price: number; time: string }>
    speed: string
    volume: string
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
  })
  const [agreeToConditions, setAgreeToConditions] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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
  const rentalPrice = selectedTariff ? selectedTariff.price : 0
  const insurancePrice = motorcycle.insurance || 0
  
  const totalPrice = rentalPrice + insurancePrice

  const getEndDateTime = () => {
    if (!selectedTariff || !bookingData.date || !bookingData.time) return { date: "", time: "" }

    let endDate = new Date(bookingData.date)
    const time = bookingData.time

    if (bookingData.tariff === "day") {
      endDate.setDate(endDate.getDate() + 1)
    } else if (bookingData.tariff === "twoDays") {
      endDate.setDate(endDate.getDate() + 2)
    } else if (bookingData.tariff === "week") {
      endDate.setDate(endDate.getDate() + 7)
    }

    // Extract hours and minutes from time string (format: HH:MM)
    const [hours, minutes] = time.split(':').map(Number)
    endDate.setHours(hours, minutes, 0, 0)

    return {
      date: format(endDate, "dd.MM.yyyy", { locale: ru }),
      time: time,
    }
  }

  const endDateTime = getEndDateTime()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone) {
      alert('Пожалуйста, заполните имя и номер телефона')
      return
    }

    if (!agreeToConditions) {
      alert('Пожалуйста, ознакомьтесь с условиями аренды')
      return
    }

    try {
      const normalizedPhone = normalizePhoneNumber(formData.phone)

      await fetch('/api/send-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          motorcycleName: motorcycle.name,
          name: formData.name,
          phone: normalizedPhone,
          date: bookingData.date ? format(bookingData.date, "dd.MM.yyyy", { locale: ru }) : '',
          time: bookingData.time,
          tariff: bookingData.tariff,
          totalPrice: totalPrice.toLocaleString(),
        }),
      })

      setIsSuccess(true)
    } catch (error) {
      console.error('Error submitting booking:', error)
      alert('Ошибка при отправке заявки. Пожалуйста, попробуйте позже.')
    }
  }

  const handleCloseSuccess = () => {
    setIsSuccess(false)
    onClose()
    setFormData({ name: '', phone: '' })
    setAgreeToConditions(false)
  }

  if (isSuccess) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      >
        <div className="w-full max-w-lg rounded-2xl relative bg-white shadow-xl p-8">
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h2 className="font-rubik font-bold text-2xl text-gray-900 mb-2">
              Спасибо за вашу заявку!
            </h2>
            <p className="text-gray-600 mb-6">
              Мы получили вашу заявку на бронь {motorcycle.name}. Свяжемся с вами в ближайшее время.
            </p>
            <p className="text-gray-600 mb-8">
              Или напишите нам в WhatsApp для более быстрого ответа:
            </p>
            
            <a
              href="https://wa.me/77079549722"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 h-14 bg-green-500 hover:bg-green-600 font-bold text-lg text-white rounded-lg transition-colors mb-3"
            >
              <MessageCircle className="w-5 h-5" />
              Написать в WhatsApp
            </a>

            <button
              onClick={handleCloseSuccess}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="w-full max-w-lg rounded-2xl relative bg-white max-h-[90vh] overflow-hidden shadow-xl">
        <div
          className="overflow-y-auto p-8 max-h-[90vh]"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h2 className="font-rubik font-bold text-2xl text-gray-900 mb-3">
              {motorcycle.name}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Gauge className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">{motorcycle.speed}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Settings className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">{motorcycle.volume}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Стоимость аренды:</span>
              <span className="text-gray-900 font-semibold">{rentalPrice.toLocaleString()} ₸</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-700">Страховка:</span>
              <span className="text-gray-900 font-semibold">{insurancePrice.toLocaleString()} ₸</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-700">Шлем:</span>
              <span className="text-gray-900">{motorcycle.helmet}</span>
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
                  {endDateTime.date} | {endDateTime.time}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-bold text-lg">Итого:</span>
                <span className="text-gray-900 font-bold text-lg">{totalPrice.toLocaleString()} ₸</span>
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

            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                id="conditions"
                checked={agreeToConditions}
                onChange={(e) => setAgreeToConditions(e.target.checked)}
                className="w-5 h-5 mt-1 text-red-600 rounded cursor-pointer"
              />
              <label htmlFor="conditions" className="flex-1 cursor-pointer text-sm">
                <span className="text-gray-700">
                  Я ознакомился с{" "}
                  <Link
                    href="/rental-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 underline"
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
