import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ObjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Состояния для мини-игры
  const [answer, setAnswer] = useState("");
  const [checkResult, setCheckResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/exhibits/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Экспонат не найден");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Функция скачивания QR
  const handleDownloadQR = (base64String, exhibitTitle) => {
    if (!base64String) return;
    const link = document.createElement("a");
    link.href = base64String;
    const safeTitle = exhibitTitle.replace(/\s+/g, "_");
    link.download = `QR_${safeTitle}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Функция отправки ответа на проверку
  const handleCheckAnswer = async () => {
    if (!answer.trim()) return; // Защита от пустой отправки
    setIsSubmitting(true);
    setCheckResult(null); // Сбрасываем прошлый результат

    try {
      const response = await fetch("/api/game/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exhibit_id: Number(id),
          answer: answer.trim(),
        }),
      });

      const result = await response.json();
      setCheckResult(result); // Сохраняем ответ бэкенда (is_correct, message, points, hint)
    } catch (err) {
      setCheckResult({
        is_correct: false,
        message: "Ошибка соединения с сервером. Попробуйте еще раз.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div
        style={{
          backgroundColor: "#4a4138",
          color: "#ffb347",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3 style={{ fontSize: "24px", fontWeight: "600" }}>
          Загрузка экспоната...
        </h3>
      </div>
    );

  if (error)
    return (
      <div
        style={{
          backgroundColor: "#4a4138",
          color: "#ff6b6b",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3 style={{ fontSize: "24px", fontWeight: "600" }}>Ошибка: {error}</h3>
      </div>
    );

  if (!data) return null;

  const { exhibit, question } = data;

  return (
    <main
      style={{
        width: "100%",
        minHeight: "100vh",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        backgroundColor: "#4a4138",
        color: "#fff",
        paddingBottom: "80px",
      }}
    >
      <style>{`
        .object-layout {
            display: flex;
            flex-wrap: wrap;
            gap: 40px;
            align-items: flex-start;
        }
        .col-left {
            flex: 1 1 400px;
            display: flex;
            flex-direction: column;
            gap: 25px;
        }
        .col-right {
            flex: 1.5 1 400px;
        }

        /* Стили для поля ввода */
        .game-input {
            flex: 1;
            min-width: 250px;
            padding: 14px 20px;
            border-radius: 8px;
            border: 2px solid rgba(255, 179, 71, 0.3);
            background-color: rgba(255, 255, 255, 0.05);
            color: #fff;
            font-size: 16px;
            outline: none;
            transition: border-color 0.3s ease;
        }
        .game-input:focus {
            border-color: #ffb347;
            background-color: rgba(255, 255, 255, 0.1);
        }
        .game-input::placeholder {
            color: rgba(255, 255, 255, 0.4);
        }

        @media (max-width: 768px) {
            .object-layout { gap: 30px; }
            .main-title { font-size: 32px !important; }
            .content-box { padding: 25px 20px !important; }
        }
      `}</style>

      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "#ffb347",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "0 0 30px 0",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <span>←</span> Назад к списку
        </button>

        <h1
          className="main-title"
          style={{
            fontSize: "clamp(36px, 5vw, 54px)",
            fontWeight: "800",
            letterSpacing: "-1px",
            margin: "0 0 40px 0",
            lineHeight: "1.2",
            textTransform: "uppercase",
          }}
        >
          {exhibit.title}
        </h1>

        <div className="object-layout">
          {/* ЛЕВАЯ КОЛОНКА */}
          <div className="col-left">
            <div
              style={{
                backgroundColor: "#2b231d",
                borderRadius: "24px",
                padding: "20px",
                boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={exhibit.main_image || "/img/logo.png"}
                alt={exhibit.title}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "500px",
                  objectFit: "contain",
                  borderRadius: "16px",
                  filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.3))",
                }}
              />
            </div>

            {exhibit.short_description && (
              <div
                style={{
                  padding: "25px",
                  backgroundColor: "#3b332c",
                  borderRadius: "16px",
                  borderLeft: "4px solid #ffb347",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                }}
              >
                <p
                  style={{
                    fontStyle: "italic",
                    fontSize: "18px",
                    color: "#e0e0e0",
                    margin: 0,
                    lineHeight: "1.6",
                  }}
                >
                  "{exhibit.short_description}"
                </p>
              </div>
            )}

            {exhibit.qr_code && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  padding: "20px",
                  backgroundColor: "#3b332c",
                  borderRadius: "16px",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: "10px",
                    borderRadius: "12px",
                  }}
                >
                  <img src={exhibit.qr_code} alt="QR Code" width="120" />
                </div>
                <div>
                  <h5
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "16px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      color: "#ffb347",
                    }}
                  >
                    QR экспоната
                  </h5>
                  <button
                    onClick={() =>
                      handleDownloadQR(exhibit.qr_code, exhibit.title)
                    }
                    style={{
                      marginTop: "5px",
                      padding: "8px 16px",
                      backgroundColor: "transparent",
                      color: "#ffb347",
                      border: "1px solid #ffb347",
                      borderRadius: "6px",
                      fontWeight: "600",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffb347";
                      e.currentTarget.style.color = "#1a1a1a";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#ffb347";
                    }}
                  >
                    Скачать
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ПРАВАЯ КОЛОНКА */}
          <div className="col-right">
            <div
              className="content-box"
              style={{
                backgroundColor: "#3b332c",
                borderRadius: "24px",
                padding: "40px 45px",
                boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
              }}
            >
              <h3
                style={{
                  fontSize: "28px",
                  fontWeight: "800",
                  textTransform: "uppercase",
                  marginBottom: "25px",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <span
                  style={{
                    width: "30px",
                    height: "4px",
                    backgroundColor: "#ffb347",
                    display: "inline-block",
                    borderRadius: "2px",
                  }}
                ></span>
                История артефакта
              </h3>

              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "1.8",
                  color: "#d5d5d5",
                  textAlign: "justify",
                  whiteSpace: "pre-line",
                  margin: 0,
                }}
              >
                {exhibit.full_description}
              </p>
            </div>

            {/* ИНТЕРАКТИВНЫЙ БЛОК (ИГРА) */}
            {question && (
              <div
                className="content-box"
                style={{
                  marginTop: "30px",
                  padding: "35px 45px",
                  backgroundColor: "#2b231d",
                  borderRadius: "24px",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255, 179, 71, 0.2)",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 15px 0",
                    fontSize: "22px",
                    fontWeight: "800",
                    color: "#ffb347",
                    textTransform: "uppercase",
                  }}
                >
                  Мини-игра: Проверь себя
                </h4>

                {/* Текст вопроса */}
                <p
                  style={{
                    margin: "0 0 20px 0",
                    fontSize: "18px",
                    lineHeight: "1.6",
                    color: "#fff",
                  }}
                >
                  {question.question_text}
                </p>

                {/* Поле ввода и кнопка */}
                <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                  <input
                    type="text"
                    className="game-input"
                    placeholder="Введите ваш ответ..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCheckAnswer();
                    }}
                    disabled={checkResult?.is_correct || isSubmitting} // Блокируем после победы
                  />
                  <button
                    onClick={handleCheckAnswer}
                    disabled={
                      !answer.trim() || checkResult?.is_correct || isSubmitting
                    }
                    style={{
                      padding: "14px 28px",
                      backgroundColor:
                        checkResult?.is_correct || !answer.trim()
                          ? "rgba(255, 179, 71, 0.5)"
                          : "#ffb347",
                      color: "#1a1a1a",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      cursor:
                        checkResult?.is_correct || !answer.trim()
                          ? "not-allowed"
                          : "pointer",
                      transition:
                        "transform 0.2s ease, backgroundColor 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!e.currentTarget.disabled) {
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.backgroundColor = "#ffc36b";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!e.currentTarget.disabled) {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.backgroundColor = "#ffb347";
                      }
                    }}
                  >
                    {isSubmitting ? "Проверка..." : "Ответить"}
                  </button>
                </div>

                {/* Вывод результата (подсказка или победа) */}
                {checkResult && (
                  <div
                    style={{
                      marginTop: "20px",
                      padding: "20px",
                      borderRadius: "12px",
                      backgroundColor: checkResult.is_correct
                        ? "rgba(76, 175, 80, 0.1)"
                        : "rgba(255, 107, 107, 0.1)",
                      borderLeft: `4px solid ${checkResult.is_correct ? "#4CAF50" : "#ff6b6b"}`,
                      animation: "fadeIn 0.5s ease-in-out",
                    }}
                  >
                    <h5
                      style={{
                        margin: "0 0 5px 0",
                        fontSize: "18px",
                        color: checkResult.is_correct ? "#4CAF50" : "#ff6b6b",
                      }}
                    >
                      {checkResult.message}
                    </h5>

                    {/* Если ответ верный - показываем баллы */}
                    {checkResult.is_correct && checkResult.points > 0 && (
                      <p style={{ margin: 0, color: "#fff", fontSize: "16px" }}>
                        Вы заработали:{" "}
                        <span style={{ color: "#ffb347", fontWeight: "bold" }}>
                          +{checkResult.points} баллов
                        </span>
                      </p>
                    )}

                    {/* Если ответ неверный и есть подсказка - показываем её */}
                    {!checkResult.is_correct && checkResult.hint && (
                      <p
                        style={{
                          margin: "10px 0 0 0",
                          color: "#d5d5d5",
                          fontSize: "15px",
                          fontStyle: "italic",
                        }}
                      >
                        <span style={{ color: "#ffb347", fontWeight: "bold" }}>
                          💡 Подсказка:
                        </span>{" "}
                        {checkResult.hint}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ObjectPage;
