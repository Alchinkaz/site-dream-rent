"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Gauge, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { format, addDays, addWeeks } from "date-fns"
import { ru } from "date-fns/locale"

interface BookingPageProps {
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
  onBack: () => void
}

export function BookingPage({ motorcycle, bookingData, onBack }: BookingPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  })

  const selectedTariff = bookingData.tariff ? motorcycle.pricing[bookingData.tariff] : null
  const rentalPrice = selectedTariff ? selectedTariff.price : 0
  const insurancePrice = motorcycle.insurance || 0

  const totalPrice = rentalPrice + motorcycle.deposit + insurancePrice

  const getEndDateTime = () => {
    if (!selectedTariff || !bookingData.date || !bookingData.time) return { date: "", time: "" }

    let endDate = bookingData.date
    const time = bookingData.time

    if (bookingData.tariff === "day") {
      endDate = addDays(bookingData.date, 1)
    } else if (bookingData.tariff === "week") {
      endDate = addWeeks(bookingData.date, 1)
    }

    return {
      date: format(endDate, "dd.MM.yyyy", { locale: ru }),
      time: time,
    }
  }

  const endDateTime = getEndDateTime()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    console.log("Booking data:", { motorcycle, bookingData, formData })
  }

  return (
    <div className="min-h-screen py-8 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад</span>
        </button>

        {/* Booking Form Card */}
        <div className="rounded-xl p-8 border border-gray-200 bg-white shadow-sm">
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h1 className="font-rubik font-bold text-3xl text-gray-900 mb-3">
              {motorcycle.name}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Gauge className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{motorcycle.speed}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Settings className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{motorcycle.volume}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Стоимость аренды:</span>
              <span className="text-gray-900 font-semibold">{rentalPrice.toLocaleString()} ₸</span>
            </div>

            <div className="flex justify-between items-start">
              <span className="text-gray-700">Депозит:</span>
              <div className="text-right">
                <div className="text-gray-900 font-semibold">{motorcycle.deposit.toLocaleString()} ₸</div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-700">Страховка:</span>
              <span className="text-gray-900 font-semibold">{insurancePrice.toLocaleString()} ₸</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-700">Шлем:</span>
              <span className="text-gray-900">1 {motorcycle.helmet}</span>
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
          </div>

          {/* Order Button */}
          <Button
            onClick={handleSubmit}
            className="w-full h-14 bg-red-600 hover:bg-red-700 font-bold text-lg text-white rounded-lg transition-colors"
            disabled={!formData.name || !formData.phone}
          >
            Заказать
          </Button>
        </div>
      </div>
    </div>
  )
}
