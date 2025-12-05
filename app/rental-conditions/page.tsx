'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function RentalConditionsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen py-8 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад</span>
        </button>

        <div className="rounded-xl p-8 border border-gray-200 bg-white shadow-sm">
          <h1 className="font-rubik font-bold text-3xl text-gray-900 mb-8">
            Условия Аренды мопедов
          </h1>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="font-rubik font-bold text-xl text-gray-900 mb-4">
                1) Состояние и комплектация мопеда
              </h2>
              <div className="space-y-2 ml-4">
                <p><span className="font-semibold">1.1)</span> Компания выдаёт полностью исправный и готовый к езде мопед</p>
                <p><span className="font-semibold">1.2)</span> Компания выдаёт шлем (В будущем появятся другие вещи, по типу перчаток и т.д.)</p>
              </div>
            </section>

            <section>
              <h2 className="font-rubik font-bold text-xl text-gray-900 mb-4">
                2) Ремонт мопеда
              </h2>
              <div className="space-y-2 ml-4">
                <p><span className="font-semibold">2.1)</span> Ремонт мопеда происходит исключительно на сервисе компании (В редких случаях, если нет возможности привезти мопед на сервис компании, мопед чиниться вне нашего сервиса)</p>
                <p><span className="font-semibold">2.2)</span> Компания меняет все расходники. Это – Масло, Свечи, тормозные колодки, шины (Если они износились во время аренды), воздушный фильтр, ремень вариатора.</p>
                <p><span className="font-semibold">2.3)</span> Во время аренды мопеда, Арендатор полностью берёт на себя ответственность, в случае не естественных поломок. То бишь поломка пластика (В том же числе царапины), поломка карбюратора (Если заливал топливо 92), пробитие или прокол шины (проколол шину иглой, саморезом или ещё чем то), износ вариатора (Если долгое время ездил на повышенных оборотах, что привело к сильному износу вариатора), поломка двигателя (Если он застучал или перестал заводиться по причине поломки мотора)</p>
              </div>
            </section>

            <section>
              <h2 className="font-rubik font-bold text-xl text-gray-900 mb-4">
                3) Выдача аренды
              </h2>
              <div className="space-y-2 ml-4">
                <p><span className="font-semibold">3.1)</span> Выдача аренды производиться на базе. При выдаче мопеда, Арендатор полностью осматривает мопед и убеждается что с мопедом всё в порядке (если видит какой то минус, то подходит к менеджеру и сообщает об этом). Так же Наш менеджер делает видео-отчёт с мопедом, показывая если есть какие то недочёты.</p>
                <p><span className="font-semibold">3.2)</span> Выдача мопеда происходит с 10.00 до 20.00</p>
                <p><span className="font-semibold">3.3)</span> Возврат мопеда происходит с 10.00 до 18.00</p>
              </div>
            </section>

            <section>
              <h2 className="font-rubik font-bold text-xl text-gray-900 mb-4">
                4) Оплата
              </h2>
              <div className="space-y-2 ml-4">
                <p><span className="font-semibold">4.1)</span> Первая оплата происходит в момент передачи мопеда в руки арендатора.</p>
                <p><span className="font-semibold">4.2)</span> После передачи мопеда арендатору, ему выдается "Путевой лист", То бишь страховка. Ни в коем случае не выезжать в дорогу без "Путевого листа", так как по закону это приравнивается к езде без страховки и в случае ДТП, страховая компания не будет компенсировать затраты.</p>
                <p><span className="font-semibold">4.3)</span> В день оплаты аренды, Менеджер пишет Арендатору и сообщает о том, что срок аренды истекает. Арендатор должен ответить и сказать, продлевает он транспорт или будет сдавать.</p>
                <p><span className="font-semibold">4.4)</span> В случае, если арендатор захочет продлить аренду мопеда, менеджер выставляет удалённый счёт на оплату или арендатор приезжает и оплачивает наличными средствами.</p>
                <p><span className="font-semibold">4.5)</span> В случае, если арендатор решил сдать мопед, сдача мопеда должна произойти в указанную дату по договору до 18.00.</p>
              </div>
            </section>

            <section>
              <h2 className="font-rubik font-bold text-xl text-gray-900 mb-4">
                5) Непредвиденные обстоятельства (ДТП или Водворение мопеда на штрафстоянку или кража)
              </h2>
              <div className="space-y-2 ml-4">
                <p><span className="font-semibold">5.1)</span> В случае ДТП, Арендатор в первую очередь звонит Нам, сообщая о ситуации, Мы подскажем и поможем решить ситуацию.</p>
                <p><span className="font-semibold">5.2)</span> В случае, если остановили сотрудники полиции и собираются водворять мопед на штрафстоянку, Арендатор обязан в первую очередь позвонить Нам, Мы подскажем как и что делать.</p>
                <p><span className="font-semibold">5.3)</span> В случае кражи мопеда, так же в первую чередь звонить к Нам. У нас установлены на мопедах GPS трекеры, с помощью которых мы отследим мопед и найдём его.</p>
              </div>
            </section>

            <section>
              <h2 className="font-rubik font-bold text-xl text-gray-900 mb-4">
                6) Запреты
              </h2>
              <div className="space-y-2 ml-4">
                <p><span className="font-semibold">6.1)</span> Арендатору запрещается перевозить пассажиров без предупреждения Компании (Многие мопеды не предназначены для перевозки второго пассажира по техпаспорту)</p>
                <p><span className="font-semibold">6.2)</span> Запрещается выезжать за пределы Г.Алматы</p>
                <p><span className="font-semibold">6.3)</span> Арендатору запрещается ездить без ГРНЗ (Номеров)</p>
                <p><span className="font-semibold">6.4)</span> Арендатору запрещается передавать мопед 3-им лицам</p>
                <p><span className="font-semibold">6.5)</span> Арендатор обязан остановиться при первом требовании сотрудников Полиции или при ДТП.</p>
              </div>
            </section>

            <section>
              <h2 className="font-rubik font-bold text-xl text-gray-900 mb-4">
                7) Обязанности Арендатора
              </h2>
              <div className="space-y-2 ml-4">
                <p><span className="font-semibold">7.1)</span> Заправляться исключительно 95-ым топливом</p>
                <p><span className="font-semibold">7.2)</span> Проверка уровня масла, проверка давления в шинах ежедневно</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
