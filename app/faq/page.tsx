"use client"

import Navbar from "@/components/navbar"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar onBookingClick={() => {}} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-b from-gray-50 to-white pt-32">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-8">
            Часто задаваемые вопросы
          </h1>
          <p className="text-lg text-gray-600 text-center">
            Найдите ответы на популярные вопросы о нашем сервисе
          </p>
        </div>
      </section>

      {/* FAQ Content - Placeholder */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Страница находится в разработке</p>
          </div>
        </div>
      </section>
    </div>
  )
}
