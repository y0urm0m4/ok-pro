import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — OK Pro",
  description: "Политика обработки персональных данных OK Pro",
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-20 bg-bg min-h-screen">
      <Container className="max-w-3xl">
        <Heading level={1} className="mb-8 text-text">
          Политика конфиденциальности
        </Heading>

        <div className="prose prose-neutral max-w-none text-text-muted leading-relaxed space-y-6">
          <p className="text-sm text-text-muted">
            Последнее обновление: апрель 2026 г.
          </p>

          <section className="space-y-3">
            <h2 className="font-sans text-xl font-semibold text-text">1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок
              обработки и защиты персональных данных пользователей сайта okpro.ru
              (далее — «Сайт»), осуществляемой ИП Константиновой О.О. (далее — «Оператор»).
            </p>
            <p>
              Использование Сайта означает безоговорочное согласие пользователя с настоящей
              Политикой и указанными в ней условиями обработки персональных данных.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-sans text-xl font-semibold text-text">2. Какие данные мы собираем</h2>
            <p>При заполнении формы заявки мы собираем:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Имя (как к вам обращаться)</li>
              <li>Номер телефона</li>
              <li>Предпочтительный способ связи</li>
              <li>Интересующая услуга</li>
              <li>Комментарий (если оставлен)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-sans text-xl font-semibold text-text">3. Цели обработки данных</h2>
            <p>Персональные данные используются исключительно для:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Обратной связи по оставленной заявке</li>
              <li>Консультации об услугах Оператора</li>
              <li>Заключения и исполнения договора на оказание услуг</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-sans text-xl font-semibold text-text">4. Хранение и защита данных</h2>
            <p>
              Оператор принимает необходимые технические и организационные меры для защиты
              персональных данных от неправомерного доступа, изменения, раскрытия или уничтожения.
              Данные не передаются третьим лицам без согласия пользователя, за исключением случаев,
              предусмотренных законодательством РФ.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-sans text-xl font-semibold text-text">5. Права пользователя</h2>
            <p>Вы вправе в любой момент:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Запросить информацию об обработке ваших данных</li>
              <li>Потребовать исправления или удаления ваших данных</li>
              <li>Отозвать согласие на обработку персональных данных</li>
            </ul>
            <p>
              Для реализации прав обратитесь по адресу:{" "}
              {/* TODO: заменить на реальный email */}
              <a href="mailto:info@okpro.ru" className="text-accent underline underline-offset-2">
                info@okpro.ru
              </a>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-sans text-xl font-semibold text-text">6. Cookies</h2>
            <p>
              Сайт может использовать cookies для улучшения пользовательского опыта.
              Вы можете отключить cookies в настройках браузера, однако это может повлиять
              на работу отдельных функций Сайта.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-sans text-xl font-semibold text-text">7. Изменения Политики</h2>
            <p>
              Оператор оставляет за собой право вносить изменения в настоящую Политику.
              Актуальная версия всегда доступна на данной странице.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-sans text-xl font-semibold text-text">8. Контакты</h2>
            <p>
              {/* TODO: добавить реальные реквизиты ИП */}
              ИП Константинова О.О.<br />
              По вопросам обработки персональных данных:{" "}
              <a href="mailto:info@okpro.ru" className="text-accent underline underline-offset-2">
                info@okpro.ru
              </a>
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
