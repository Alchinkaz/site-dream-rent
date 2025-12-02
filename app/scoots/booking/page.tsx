'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Gauge, Settings, CheckCircle, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { motorcycleData } from '@/lib/motorcycles-data'
import { normalizePhoneNumber } from '@/lib/phone-utils'

function BookingPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  })
  const [agreeToConditions, setAgreeToConditions] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const motorcycleId = searchParams.get('motorcycleId')
  const dateStr = searchParams.get('date')
  const time = searchParams.get('time')
  const tariff = searchParams.get('tariff')

  const motorcycle = motorcycleId ? motorcycleData[motorcycleId as keyof typeof motorcycleData] : null

  if (!motorcycle) {
    return (
      <div className="min-h-screen py-8 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600">Мотоцикл не найден</p>
        </div>
      </div>
    )
  }

  const startDate = dateStr ? (() => {
    const [year, month, day] = dateStr.split('-').map(Number)
    // Create date in local timezone (GTM+5), not UTC
    const date = new Date(year, month - 1, day)
    // Set to midnight in local timezone
    date.setHours(0, 0, 0, 0)
    return date
  })() : null

  const selectedTariff = tariff ? motorcycle.pricing[tariff as keyof typeof motorcycle.pricing] : null
  const rentalPrice = selectedTariff ? selectedTariff.price : 0
  const insurancePrice = motorcycle.insurance || 0
  const totalPrice = rentalPrice + insurancePrice

  const getEndDateTime = () => {
    if (!selectedTariff || !startDate || !time) return { date: "", time: "" }

    // Create end date by cloning start date
    let endDate = new Date(startDate)
    
    // Add days based on tariff type
    if (tariff === "day") {
      // 1 day rental ends 1 day later
      endDate.setDate(endDate.getDate() + 1)
    } else if (tariff === "twoDays") {
      // 2 days rental ends 2 days later
      endDate.setDate(endDate.getDate() + 2)
    } else if (tariff === "week") {
      // 1 week rental ends 7 days later
      endDate.setDate(endDate.getDate() + 7)
    }

    // Set the time to match start time
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
          date: startDate ? format(startDate, "dd.MM.yyyy", { locale: ru }) : '',
          time: time,
          tariff: tariff,
          totalPrice: totalPrice.toLocaleString(),
        }),
      })

      setIsSuccess(true)
    } catch (error) {
      console.error('Error submitting booking:', error)
      alert('Ошибка при отправке заявки. Пожалуйста, попробуйте позже.')
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen py-8 bg-white flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl p-8 border border-gray-200 bg-white shadow-sm text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4 mx-auto" />
            <h1 className="font-rubik font-bold text-3xl text-gray-900 mb-2">
              Спасибо за вашу заявку!
            </h1>
            <p className="text-gray-600 mb-4">
              Мы получили вашу заявку на бронь {motorcycle.name}. Свяжемся с вами в ближайшее время.
            </p>
            <p className="text-gray-600 mb-8">
              Или напишите нам в WhatsApp для более быстрого ответа:
            </p>
            
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
              onClick={() => router.push('/scoots')}
              className="block w-full text-gray-600 hover:text-gray-900 transition-colors"
            >
              Вернуться к мопедам
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
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
                  {startDate ? format(startDate, "dd.MM.yyyy", { locale: ru }) : "Не выбрано"} | {time || "Не выбрано"}
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

            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                id="conditions"
                checked={agreeToConditions}
                onChange={(e) => setAgreeToConditions(e.target.checked)}
                className="w-5 h-5 mt-1 text-red-600 rounded cursor-pointer"
              />
              <label htmlFor="conditions" className="flex-1 cursor-pointer">
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

          {/* Order Button */}
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

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <BookingPageContent />
    </Suspense>
  )
}
