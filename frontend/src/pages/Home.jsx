import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="page-container page-container-hidden-x home-page">
      <section className="home-about-section">
        <img src="/img/gus.png" alt="Фото гуся"className="mobile-gus"/>

        <div className="home-about-card">
          <h2 className="home-about-title">О музее</h2>
          <p className="home-about-desc">
            Шадринский краеведческий музей - один из старейших музеев Урала,
            открытие которого состоялось 9 января 1918 года.
          </p>
          <Link to="/museum" className="btn-primary"> Подробнее </Link>
        </div>

        <img src="/img/muzei.png" alt="Фото музея" className="mobile-muzei"/>
      </section>

      <div className="content-wrapper">
        <section id="collections" className="home-collections">
          <h2 className="home-collections-title">Коллекции</h2>
          <ul className="home-collections-list">
            {[
              "Естественнонаучная коллекция",
              "Коллекция фалеристики",
              "Коллекция утюгов",
              "Коллекция редких книг",
              "Коллекция листовок 1917-1920 гг.",
              "Коллекция конфетных оберток",
              "Коллекция художественных работ Ф.А. Бронникова",
              "Советская фалеристика",
            ].map((item, index) => (
              <li key={index} className="home-collections-item">
                <span className="home-collections-bullet">•</span> {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <img src="/img/nabor.png" alt="Коллаж коллекций" className="home-collage"/>

      <div className="content-wrapper">
        <section className="home-interactive-section">
          <div className="home-interactive-img-wrap">
            <img src="/img/statue.png" alt="Декор" className="home-interactive-img"/>
          </div>
          <div className="home-interactive-content">
            <h2 className="home-interactive-title">ОЖИВШАЯ ИСТОРИЯ</h2>
            <p className="home-interactive-desc">
              Перейдите в наш интерактивный музей, чтобы рассмотреть артефакты в
              деталях, узнать их скрытые истории и погрузиться в атмосферу
              прошлого.
            </p>
            <Link to="/interactive" className="btn-interactive">
              Интерактивный музей ➔
            </Link>
          </div>
        </section>

        <section className="home-team-section">
          <h2 className="home-team-title">Команда разработчиков</h2>

          <div className="home-team-grid">
            {[
              { name: "Владислав Сошников", role: "Backend разработчик", img: "/img/vlad.png" },
              { name: "Валерия Петрова", role: "Frontend разработчик и дизайнер", img: "/img/lera.png" },
              { name: "Софья Макарова", role: "Frontend разработчик и дизайнер", img: "/img/sonya.png" },
              { name: "Лилия Орлова", role: "Fullstack разработчик", img: "/img/lila.png" },
            ].map((member, idx) => (
              <div key={idx} className="home-team-member">
                <div className="home-team-img-wrap">
                  <img src={member.img} alt={member.name} className="home-team-img" />
                </div>
                <strong className="home-team-name">{member.name}</strong>
                <p className="home-team-role">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;