import { Link } from "react-router-dom";

function Home() {
  return (
    <main
      style={{
        width: "100%",
        overflowX: "hidden", // ВАЖНО: обрезает всё, что выходит за края экрана
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        backgroundColor: "#4a4138", // Основной фон сайта
        color: "#fff",
        paddingBottom: "40px",
      }}
    >
      {/* ДОБАВЛЕН ТОЛЬКО ЭТОТ БЛОК СТИЛЕЙ ДЛЯ АДАПТАЦИИ */}
      <style>{`
        /* Планшеты */
        @media (max-width: 1024px) {
          .mobile-gus { height: 110% !important; left: -80px !important; }
          .mobile-muzei { height: 90% !important; right: -450px !important; }
        }

        /* Большие телефоны */
        @media (max-width: 768px) {
          .mobile-gus {
            height: 80% !important;
            left: -100px !important;
            opacity: 0.3 !important;
          }
          .mobile-muzei {
            height: 70% !important;
            right: -250px !important;
            opacity: 0.3 !important;
          }
        }

        /* Маленькие телефоны */
        @media (max-width: 480px) {
          .mobile-gus {
            height: 60% !important;
            left: -60px !important;
            opacity: 0.15 !important;
          }
          .mobile-muzei {
            height: 50% !important;
            right: -150px !important;
            opacity: 0.15 !important;
          }
        }
      `}</style>

      {/* СЕКЦИЯ 1: О МУЗЕЕ */}
      <section
        style={{
          position: "relative",
          marginTop: "100px",
          width: "100%",
          minHeight: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
          marginBottom: "80px",
          boxSizing: "border-box",
        }}
      >
        {/* Левое фото (Гусь) — добавили класс mobile-gus */}
        <img
          src="/img/gus.png"
          alt="Фото гуся"
          className="mobile-gus"
          style={{
            position: "absolute",
            left: "-60px",
            top: "50%",
            transform: "translateY(-50%)",
            height: "140%",
            width: "auto",
            zIndex: 1,
            pointerEvents: "none",
            transition: "all 0.3s ease", // добавлена плавность при ресайзе окна
          }}
        />

        {/* Центральный текстовый блок */}
        <div
          style={{
            position: "relative",
            maxWidth: "500px",
            width: "100%",
            textAlign: "center",
            padding: "40px 30px",
            backgroundColor: "#3b332c",
            borderRadius: "24px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
            zIndex: 2,
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 36px)",
              fontWeight: "800",
              textTransform: "uppercase",
              marginBottom: "20px",
              letterSpacing: "-1px",
              color: "#fff",
            }}
          >
            О музее
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#e0e0e0",
              lineHeight: "1.6",
              marginBottom: "30px",
            }}
          >
            Шадринский краеведческий музей - один из старейших музеев Урала,
            открытие которого состоялось 9 января 1918 года.
          </p>
          <Link
            to="/museum"
            style={{
              display: "inline-block",
              padding: "12px 28px",
              backgroundColor: "#fff",
              color: "#1a1a1a",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "1px",
              transition: "transform 0.2s ease, backgroundColor 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.backgroundColor = "#eaeaea";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.backgroundColor = "#fff";
            }}
          >
            Подробнее
          </Link>
        </div>

        {/* Правое фото (Музей) — добавили класс mobile-muzei */}
        <img
          src="/img/muzei.png"
          alt="Фото музея"
          className="mobile-muzei"
          style={{
            position: "absolute",
            right: "-700px",
            top: "50%",
            transform: "translateY(-50%)",
            height: "120%",
            width: "auto",
            zIndex: 1,
            pointerEvents: "none",
            transition: "all 0.3s ease", // добавлена плавность
          }}
        />
      </section>

      {/* --- ОГРАНИЧИТЕЛЬ 1200px ДЛЯ КОНТЕНТА --- */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        {/* СЕКЦИЯ 2: КОЛЛЕКЦИИ */}
        <section
          style={{
            backgroundColor: "#3b332c",
            padding: "50px",
            borderRadius: "24px",
            marginBottom: "60px",
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "800",
              textAlign: "center",
              marginBottom: "40px",
              textTransform: "uppercase",
              color: "#fff",
            }}
          >
            Коллекции
          </h2>
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              listStyle: "none",
              padding: "0",
              margin: "0",
            }}
          >
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
              <li
                key={index}
                style={{
                  backgroundColor: "#4a4138",
                  padding: "20px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#eee",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateX(5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateX(0)")
                }
              >
                <span style={{ color: "#ffb347", fontSize: "20px" }}>•</span>{" "}
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* КОЛЛАЖ (Выходит за экран слева и справа) */}
      <img
        src="/img/nabor.png"
        alt="Коллаж коллекций"
        style={{
          width: "calc(110vw + 120px)",
          maxWidth: "none",
          marginLeft: "calc(50% - 50vw - 150px)",
          display: "block",
          objectFit: "cover",
          marginBottom: "80px",
        }}
      />

      {/* --- СНОВА ОГРАНИЧИТЕЛЬ 1200px ДЛЯ НИЖНЕГО КОНТЕНТА --- */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        {/* СЕКЦИЯ 3: ИНТЕРАКТИВНЫЙ МУЗЕЙ */}
        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
            alignItems: "center",
            backgroundColor: "#2b231d",
            color: "#fff",
            padding: "50px",
            borderRadius: "24px",
            marginBottom: "80px",
          }}
        >
          <div
            style={{
              flex: "1 1 350px",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <img
              src="/img/statue.png"
              alt="Декор"
              style={{ width: "100%", display: "block", objectFit: "cover" }}
            />
          </div>
          <div style={{ flex: "1.5 1 350px", padding: "20px" }}>
            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: "800",
                marginBottom: "20px",
                lineHeight: "1.2",
              }}
            >
              ОЖИВШАЯ ИСТОРИЯ
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#ccc",
                lineHeight: "1.6",
                marginBottom: "30px",
              }}
            >
              Перейдите в наш интерактивный музей, чтобы рассмотреть артефакты в
              деталях, узнать их скрытые истории и погрузиться в атмосферу
              прошлого.
            </p>
            <Link
              to="/interactive"
              style={{
                display: "inline-block",
                padding: "14px 32px",
                backgroundColor: "#fff",
                color: "#111",
                textDecoration: "none",
                borderRadius: "8px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1px",
                transition: "transform 0.2s ease, boxShadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 20px rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Интерактивный музей ➔
            </Link>
          </div>
        </section>

        {/* СЕКЦИЯ 4: КОМАНДА РАЗРАБОТЧИКОВ */}
        <section style={{ marginBottom: "40px" }}>
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
            Команда разработчиков
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "40px",
              textAlign: "center",
            }}
          >
            {[
              {
                name: "Владислав Сошников",
                role: "Backend разработчик",
                img: "/img/vlad.png",
              },
              {
                name: "Валерия Петрова",
                role: "Frontend разработчик и дизайнер",
                img: "/img/lera.png",
              },
              {
                name: "Софья Макарова",
                role: "Frontend разработчик и дизайнер",
                img: "/img/sonya.png",
              },
              {
                name: "Лилия Орлова",
                role: "Fullstack разработчик",
                img: "/img/lila.png",
              },
            ].map((member, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px",
                  borderRadius: "16px",
                  backgroundColor: "#3b332c",
                  transition: "transform 0.3s ease",
                  cursor: "default",
                  boxSizing: "border-box",
                  height: "100%",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-10px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "3 / 4",
                    overflow: "hidden",
                    borderRadius: "12px",
                    marginBottom: "20px",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                    backgroundColor: "#4a4138",
                  }}
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <strong
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#fff",
                    marginBottom: "8px",
                  }}
                >
                  {member.name}
                </strong>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#ccc",
                    margin: "0",
                    lineHeight: "1.4",
                  }}
                >
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;
