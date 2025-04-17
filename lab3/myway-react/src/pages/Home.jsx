import "../styles/index.css";

export default function Home() {
  return (
    <main>
      <h1 className="main-title">MyWay – твоя персональна дорога до змін</h1>
      <p className="title-descript">
        Це платформа для досягнення особистих цілей та розвитку.
        Реєструйтеся та почніть досягати своїх цілей вже сьогодні!
      </p>

      <section className="about-section">
        <div className="about-container">
          <div className="about-text">
            <h2>Навіщо потрібні цілі?</h2>
            <p>
              Без цілей життя схоже на хаос, на низку випадкових подій, які ми не можемо контролювати.
              Цілі допомагають розібратися з нашими бажаннями, емоціями, планами і досягти того, що для нас важливо.
              Це впливає на відносини з собою і з людьми, на розуміння того, чого ми хочемо в житті.
              І життя наповнюється по-справжньому цінними для нас подіями, а не просто випадковими.
            </p>
            <p>
              Шлях до мети — це рух з точки А в точку Б. Якщо шлях побудований правильно,
              на ньому ми долаємо перешкоди, знижуємо тривожність і отримуємо впевненість в собі.
              Коли досягаємо точки Б, у нас з’являється енергія і можливості вибудовувати нові маршрути.
              Це дуже захоплююча подорож.
            </p>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="features-title">Які можливості Ви отримуєте?</h2>
        <div className="features-container">
          <div className="feature-card">
            <img src="../assets/goal_setting.png" alt="Створення персональних цілей" />
            <div className="feature-text">Створення персональних цілей</div>
          </div>
          <div className="feature-card">
            <img src="../assets/progress.jpg" alt="Відстеження прогресу" />
            <div className="feature-text">Відстеження власного прогресу</div>
          </div>
          <div className="feature-card">
            <img src="../assets/community.jpg" alt="Підтримка в спільноті" />
            <div className="feature-text">Підтримка та обговорення в спільноті</div>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <h2 className="features-title">Поширені запитання</h2>
        <div className="faq-container">
          <details className="faq-item">
            <summary className="faq-question">
              Що таке MyWay?<span className="arrow">▼</span>
            </summary>
            <div className="faq-answer">
              MyWay — це онлайн-платформа, яка допомагає користувачам ставити та досягати своїх особистих цілей.
              Це інструмент для саморозвитку та мотивації.
            </div>
          </details>

          <details className="faq-item">
            <summary className="faq-question">
              Як додати нову ціль?<span className="arrow">▼</span>
            </summary>
            <div className="faq-answer">
              Перейдіть до розділу "Мої цілі" і натисніть кнопку "Додати нову ціль".
              Заповніть необхідні поля, встановіть дедлайн та почніть працювати над своєю метою.
            </div>
          </details>

          <details className="faq-item">
            <summary className="faq-question">
              Як я можу відстежувати мій прогрес?<span className="arrow">▼</span>
            </summary>
            <div className="faq-answer">
              У розділі "Прогрес" ви можете переглядати графіки та списки з вашими досягненнями,
              а також отримувати нагороди за виконані етапи.
            </div>
          </details>

          <details className="faq-item">
            <summary className="faq-question">
              Як звернутися до спільноти за підтримкою?<span className="arrow">▼</span>
            </summary>
            <div className="faq-answer">
              Відвідайте розділ "Спільнота", де ви можете залишати коментарі,
              обговорювати цілі з іншими користувачами та отримувати поради.
            </div>
          </details>
        </div>
      </section>
    </main>
  );
}
