import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Interactive() {
  const [exhibits, setExhibits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/exhibits")
      .then((response) => {
        if (!response.ok) throw new Error("Ошибка при загрузке данных");
        return response.json();
      })
      .then((data) => {
        setExhibits(data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка загрузки экспонатов:", error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="page-container interactive-page">
      <header className="interactive-header">
        <h1 className="page-header-title">Интерактивный музей</h1>
        <div className="section-divider"></div>
      </header>

      <section className="content-wrapper interactive-intro">
        <img
          src="/img/gus.png"
          alt="Статуя гуся"
          className="interactive-intro-img"
        />

        <div className="interactive-intro-card">
          <p className="interactive-intro-text">
            Наш музей — это мультимедийное пространство, где знания оживают в
            удобном для вас формате. Мы объединили глубину классических статей с
            динамикой видео и наглядностью фото.
          </p>
          <p className="interactive-intro-subtitle">Как это работает:</p>
          <ul className="interactive-intro-list">
            <li><strong>• Читайте:</strong> Увлекательные исследования и редкие факты.</li>
            <li><strong>• Смотрите:</strong> Эксклюзивные видеоматериалы и архивные хроники.</li>
            <li><strong>• Исследуйте:</strong> Рассматривайте детали на детальных снимках в собственном темпе.</li>
          </ul>
        </div>
      </section>

      <div className="content-wrapper">
        <h2 className="exhibits-title">Наши экспонаты</h2>

        {loading ? (
          <div className="exhibits-loading"><p>Загрузка экспонатов...</p></div>
        ) : exhibits.length > 0 ? (
          <div className="exhibits-grid">
            {exhibits.map((exhibit) => (
              <Link
                to={`/exhibit/${exhibit.ID || exhibit.id}`}
                key={exhibit.ID || exhibit.id}
                style={{ textDecoration: "none" }}
              >
                <div className="exhibit-card">
                  <div className="exhibit-img-wrap">
                    <img
                      src={exhibit.main_image || exhibit.image || "/img/logo.png"}
                      alt={exhibit.Title || exhibit.title}
                      className="exhibit-img"
                    />
                  </div>
                  <div className="exhibit-info">
                    <h3 className="exhibit-title">{exhibit.Title || exhibit.title}</h3>
                    <span className="exhibit-link-text">Изучить ➔</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="exhibits-loading"><p>Экспонатов пока нет.</p></div>
        )}
      </div>
    </main>
  );
}

export default Interactive;