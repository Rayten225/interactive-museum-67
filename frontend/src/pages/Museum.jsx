import { Link } from "react-router-dom";

function Museum() {
  return (
    <main
      style={{
        width: "100%",
        overflowX: "hidden", // Обрезает выступающие элементы по краям экрана, исключая появление полосы прокрутки
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        backgroundColor: "#4a4138", // Основной благородный фон сайта
        color: "#fff",
        paddingBottom: "60px",
      }}
    >
      {/* Встроенные стили для адаптивности (медиа-запросы) */}
      <style>{`
        /* Сетка для 2 блока */
        .structure-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px;
          fontSize: 18px;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        /* Общие стили для вылезающей картинки первого блока */
        .side-image {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: auto;
          z-index: 1;
          pointer-events: none;
          border: none;
        }
        .left-image {
          left: -130px;
          height: 150%;
        }

        /* Выравнивание первого текстового блока */
        .text-box-1 {
          margin-left: 40%;
        }

        /* Внутренние отступы текстовых блоков */
        .text-box-padding {
          padding: 40px 35px;
        }

        /* ПЛАНШЕТЫ */
        @media (max-width: 1024px) {
          .structure-grid {
            grid-template-columns: repeat(2, 1fr); /* 2 в ряд на планшете */
          }
          .text-box-1 {
            margin-left: 10% !important; /* Уменьшаем отступ */
          }
          .left-image {
            left: -50px !important;
            height: 100% !important; /* Уменьшаем, чтобы не разъезжались */
            opacity: 0.2; /* Делаем полупрозрачным фоном */
          }
        }

        /* МОБИЛЬНЫЕ ТЕЛЕФОНЫ */
        @media (max-width: 768px) {
          .structure-grid {
            grid-template-columns: 1fr; /* 1 в ряд на телефоне */
          }
          .side-image {
            display: none; /* Полностью прячем вылезающие картинки на телефоне, чтобы не ломали верстку */
          }
          .text-box-1 {
            margin-left: 0 !important; /* Центрируем первый блок */
          }
          .text-box-padding {
            padding: 25px 20px !important; /* Уменьшаем внутренние отступы блоков на телефоне */
          }
          .adaptive-section {
            padding: 20px 10px !important;
            margin-bottom: 40px !important;
            min-height: auto !important;
          }
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
          История музея
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

      {/* БЛОК 1: НАЧАЛО ИСТОРИИ */}
      <section
        className="adaptive-section"
        style={{
          position: "relative",
          width: "100%",
          minHeight: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
          marginBottom: "110px",
          boxSizing: "border-box",
        }}
      >
        {/* Старое фото выглядывает слева */}
        <img
          src="/img/old-muzei.png"
          alt="Старое фото"
          className="side-image left-image"
        />

        {/* Текст блока 1 */}
        <div
          className="text-box-1 text-box-padding"
          style={{
            position: "relative",
            maxWidth: "1000px",
            width: "100%",
            backgroundColor: "#3b332c",
            borderRadius: "24px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
            zIndex: 2,
            boxSizing: "border-box",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              color: "#e0e0e0",
              lineHeight: "1.7",
              margin: 0,
              textAlign: "justify",
            }}
          >
            Первоначально музей входил в состав Шадринского Научного Хранилища,
            объединявшего архив и научную библиотеку. Открытие Шадринского
            Научного Хранилища состоялось 9 января 1918 г. (27 декабря 1917 г.
            по ст. ст.). Долгое время Хранилище помещалось в здании на
            Михайловской площади (теперь на его месте многоквартирный жилой Дом
            — ул. Комсомольская, 5). В основу музейного фонда легли предметы
            коллекций В. П. Бирюкова, перевезенные из с. Першинского, экспонаты
            музея им. А. С. Пушкина, художественное наследие профессора
            исторической живописи Ф. А. Бронникова.
          </p>
        </div>
      </section>

      {/* СЕКЦИЯ 2: СТРУКТУРА ХРАНИЛИЩА */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 20px",
          boxSizing: "border-box",
        }}
      >
        <section
          style={{
            backgroundColor: "#3b332c",
            padding: "45px 40px",
            borderRadius: "24px",
            marginBottom: "80px",
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.1)",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "30px",
              lineHeight: "1.5",
              color: "#fff",
            }}
          >
            Структура Шадринского Научного Хранилища за период его существования
            неоднократно менялась. С первых дней организации в состав Научного
            Хранилища входили:
          </p>

          <ul className="structure-grid">
            {[
              {
                title: "Музей местного края",
                text: "Включал в себя естественно-историческую группу отделов (климатология, почвоведение, геология, палеонтология, ботаника, зоология) и культурно-историческую (археология, этнография, церковная история, нумизматика, краевая дореволюционная история, история революции).",
              },
              {
                title: "Художественная галерея",
                text: "Содержащая шедевры и предметы по направлениям: живопись, скульптура, архитектура и художественная промышленность.",
              },
              {
                title: "Архив",
                text: "Заключавший в себе ценнейшие архивы земской и городской управ, уездного съезда, уездного полицейского управления, уездного казначейства, около 25 архивов волостных правлений, церковные, монастырский, уездного и городского училищ.",
              },
              {
                title: "Библиотека",
                text: "Включающая в себя земские, городские, кооперативные и официальные издания, редкие научные и общие журналы, уникальные монографии и богатое газетное отделение.",
              },
            ].map((item, idx) => (
              <li
                key={idx}
                style={{
                  backgroundColor: "#4a4138",
                  padding: "25px",
                  borderRadius: "16px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <strong
                  style={{
                    color: "#ffb347",
                    fontSize: "18px",
                    fontWeight: "700",
                  }}
                >
                  • {item.title}
                </strong>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#ccc",
                    margin: 0,
                    lineHeight: "1.5",
                    textAlign: "justify",
                  }}
                >
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* КОЛЛАЖ */}
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

      {/* БЛОК 3: КОРПУСА (ИСПРАВЛЕННЫЙ ВАРИАНТ) */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "40px",
            marginBottom: "80px",
          }}
        >
          {/* Фото здания слева в нормальном размере */}
          <div
            style={{
              flex: "1 1 300px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src="/img/old-muzei2.png"
              alt="Здание"
              style={{
                width: "100%",
                maxWidth: "400px",
                height: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
              }}
            />
          </div>

          {/* Текст блока 3 (справа) */}
          <div
            className="text-box-padding"
            style={{
              flex: "1.5 1 400px",
              backgroundColor: "#3b332c",
              borderRadius: "24px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
              boxSizing: "border-box",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                color: "#e0e0e0",
                lineHeight: "1.7",
                margin: 0,
                textAlign: "justify",
              }}
            >
              В 1923–1925 гг. Научное Хранилище включало: музей сельского
              хозяйства, промышленности и технических знаний. Для размещения
              научных коллекций Научному Хранилищу потребовалось четыре корпуса
              по адресу ул. К. Маркса.
            </p>
          </div>
        </section>
      </div>

      {/* СЕКЦИЯ 4: СОВРЕМЕННЫЙ ПЕРИОД И ПЕРЕЕЗДЫ */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          boxSizing: "border-box",
        }}
      >
        <section
          style={{
            backgroundColor: "#2b231d",
            padding: "45px 40px",
            borderRadius: "24px",
            marginBottom: "80px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
          }}
        >
          <h3
            style={{
              fontSize: "24px",
              fontWeight: "800",
              marginBottom: "20px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Путь сквозь эпохи
          </h3>
          <p
            style={{
              fontSize: "17px",
              lineHeight: "1.8",
              color: "#ccc",
              textAlign: "justify",
              margin: 0,
            }}
          >
            В 1924 г. от Научного Хранилища отделился Архив. С 1930-х г. Научное
            Хранилище существует как самостоятельное учреждение – музей. В
            военные годы музей находился на консервации. Имущество и экспонаты
            хранились в подвалах школы № 9 (ныне филиал школы № 10 по ул.
            Ленина). По некоторым сведениям, еще до начала войны музей
            размещался в Спасо-Преображенском соборе. <br />
            <br />
            В октябре 1945 года горисполком под размещение музея передал
            помещение, принадлежащее райпотребсоюзу, в котором был произведен
            капитальный ремонт. Для посетителей музей открылся 1 сентября 1946
            года. В 1946–1947 годах экспозиций не было, так как не было
            помещений под размещение фондов, выставлялись только некоторые
            экспонаты. Это же помещение использовалось и как хранилище. <br />
            <br />В 1948 году музей вернулся в ранее занимаемое здание
            Спасо-Преображенского собора. В 1978 году музей пережил еще один
            переезд, вновь открывшись в здании бывших торговых рядов по ул.
            Комсомольской, 9. С декабря 2007 года музей приостановил свою
            деятельность. В первой половине 2008 года музей переехал в здание по
            адресу Свердлова, 41, в котором ранее размещалась Ночвинская
            больница, позднее располагался городской роддом. Это один из
            красивейших памятников архитектуры нач. ХХ века в Шадринске.
          </p>
        </section>
      </div>

      {/* БОЛЬШОЕ ФОТО МУЗЕЯ */}
      <img
        src="/img/muzei-glass.png"
        alt="Большое фото музея"
        style={{
          width: "calc(100vw + 120px)",
          maxWidth: "none",
          marginLeft: "calc(50% - 50vw - 60px)",
          display: "block",
          objectFit: "cover",
          border: "none",
          marginBottom: "-70px",
        }}
      />
    </main>
  );
}

export default Museum;
