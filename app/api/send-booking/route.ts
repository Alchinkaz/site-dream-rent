import { type NextRequest, NextResponse } from "next/server"
import { normalizePhoneNumber } from "@/lib/phone-utils"

const TELEGRAM_BOT_TOKEN = "8282425927:AAESu7PepHswGCOHrdLwVgnT90yPDgSeR0w"
const TELEGRAM_GROUP_ID = "-4685754800"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { motorcycleName, name, phone, date, time, tariff, totalPrice, vehicleType = "motorcycle" } = body

    const normalizedPhone = normalizePhoneNumber(phone)

    const vehicleLabel = vehicleType === "car" ? "🚗 Авто" : "🏍 Мопед"

    const message = `
📋 НОВАЯ БРОНЬ

${vehicleLabel}: ${motorcycleName}
👤 Имя: ${name}
📱 Телефон: ${normalizedPhone}
📅 Дата начала: ${date}
⏰ Время: ${time}
📦 Тариф: ${tariff}
💰 Сумма: ${totalPrice} ₸
`

    const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_GROUP_ID,
        text: message.trim(),
        parse_mode: "HTML",
      }),
    })

    if (!telegramResponse.ok) {
      const error = await telegramResponse.text()
      console.error("Telegram error:", error)
      return NextResponse.json({ error: "Ошибка при отправке сообщения" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Send booking error:", error)
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 })
  }
}
