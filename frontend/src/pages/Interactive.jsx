import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Interactive() {
  const [exhibits, setExhibits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/exhibits")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных");
        }
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
    <main
      style={{
        width: "100%",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        backgroundColor: "#4a4138", // Основной фон сайта
        color: "#fff",
        paddingBottom: "80px",
        minHeight: "100vh",
      }}
    >
      {/* Встроенные стили для сетки экспонатов */}
      <style>{`
                .exhibits-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 30px;
                }
            `}</style>

      {/* ЗАГОЛОВОК СТРАНИЦЫ */}
      <header
        style={{
          textAlign: "center",
          padding: "60px 20px 20px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: "800",
            textTransform: "uppercase",
            letterSpacing: "-1px",
            margin: 0,
            color: "#fff",
          }}
        >
          Интерактивный музей
        </h1>
        <div
          style={{
            width: "60px",
            height: "4px",
            backgroundColor: "#ffb347",
            margin: "20px auto 0 auto",
            borderRadius: "2px",
          }}
        ></div>
      </header>

      {/* ВВОДНЫЙ БЛОК (Фото отдельно, текст со своей высотой) */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          alignItems: "center", // Картинка и текст выравниваются по центру друг друга, но НЕ растягиваются
          padding: "20px",
          marginBottom: "80px",
          boxSizing: "border-box",
        }}
      >
        {/* Просто фото (без блока-подложки) */}
        <img
          src="/img/gus.png"
          alt="Статуя гуся"
          style={{
            flex: "1 1 300px",
            maxWidth: "400px", // Ограничиваем максимальный размер картинки
            height: "auto", // Высота подстраивается под ширину (естественные пропорции)
            display: "block",
            margin: "0 auto",
          }}
        />

        {/* Текстовый блок справа (имеет свою независимую высоту) */}
        <div
          style={{
            flex: "1.5 1 400px",
            backgroundColor: "#3b332c",
            borderRadius: "24px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
            padding: "40px 35px",
            boxSizing: "border-box",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "25px",
              lineHeight: "1.6",
              color: "#fff",
              margin: "0 0 25px 0",
            }}
          >
            Наш музей — это мультимедийное пространство, где знания оживают в
            удобном для вас формате. Мы объединили глубину классических статей с
            динамикой видео и наглядностью фото.
          </p>
          <p
            style={{
              fontSize: "18px",
              marginBottom: "15px",
              color: "#ffb347",
              fontWeight: "700",
              textTransform: "uppercase",
            }}
          >
            Как это работает:
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <li
              style={{ fontSize: "18px", color: "#e0e0e0", lineHeight: "1.5" }}
            >
              <strong style={{ color: "#fff" }}>• Читайте:</strong>{" "}
              Увлекательные исследования и редкие факты.
            </li>
            <li
              style={{ fontSize: "18px", color: "#e0e0e0", lineHeight: "1.5" }}
            >
              <strong style={{ color: "#fff" }}>• Смотрите:</strong>{" "}
              Эксклюзивные видеоматериалы и архивные хроники.
            </li>
            <li
              style={{ fontSize: "18px", color: "#e0e0e0", lineHeight: "1.5" }}
            >
              <strong style={{ color: "#fff" }}>• Исследуйте:</strong>{" "}
              Рассматривайте детали на детальных снимках в собственном темпе.
            </li>
          </ul>
        </div>
      </section>

      {/* СЕТКА ЭКСПОНАТОВ */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "32px",
            fontWeight: "800",
            textTransform: "uppercase",
            marginBottom: "50px",
            color: "#fff",
          }}
        >
          Наши экспонаты
        </h2>

        {loading ? (
          <div style={{ textAlign: "center", padding: "50px 0" }}>
            <p style={{ fontSize: "20px", color: "#ccc", fontWeight: "500" }}>
              Загрузка экспонатов...
            </p>
          </div>
        ) : exhibits.length > 0 ? (
          <div className="exhibits-grid">
            {exhibits.map((exhibit) => (
              <Link
                to={`/exhibit/${exhibit.ID || exhibit.id}`}
                key={exhibit.ID || exhibit.id}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    backgroundColor: "#3b332c",
                    borderRadius: "16px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                    transition:
                      "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 15px 35px rgba(0,0,0,0.3)";
                    e.currentTarget.style.backgroundColor = "#423a32";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 25px rgba(0,0,0,0.15)";
                    e.currentTarget.style.backgroundColor = "#3b332c";
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "4 / 3",
                      backgroundColor: "#2b231d",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "20px",
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      src={
                        exhibit.main_image || exhibit.image || "/img/logo.png"
                      }
                      alt={exhibit.Title || exhibit.title}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.4))",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      padding: "25px 20px",
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <h3
                      style={{
                        color: "#fff",
                        fontSize: "20px",
                        fontWeight: "700",
                        textAlign: "center",
                        margin: 0,
                        lineHeight: "1.3",
                      }}
                    >
                      {exhibit.Title || exhibit.title}
                    </h3>
                    <span
                      style={{
                        marginTop: "15px",
                        fontSize: "14px",
                        color: "#ffb347",
                        textTransform: "uppercase",
                        fontWeight: "600",
                        letterSpacing: "1px",
                      }}
                    >
                      Изучить ➔
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "50px 0" }}>
            <p style={{ fontSize: "20px", color: "#ccc" }}>
              Экспонатов пока нет.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Interactive;
