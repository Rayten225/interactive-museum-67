import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ObjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleCheckAnswer = async () => {
    if (!answer.trim()) return;
    setIsSubmitting(true);
    setCheckResult(null);

    try {
      const response = await fetch("/api/game/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exhibit_id: Number(id), answer: answer.trim() }),
      });
      const result = await response.json();
      setCheckResult(result);
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
      <div className="page-container object-loading">
        <h3>Загрузка экспоната...</h3>
      </div>
    );

  if (error)
    return (
      <div className="page-container object-error">
        <h3>Ошибка: {error}</h3>
      </div>
    );

  if (!data) return null;

  const { exhibit, question } = data;

  return (
    <main className="page-container object-page">
      <div className="content-wrapper" style={{ padding: "40px 20px" }}>
        <button onClick={() => navigate(-1)} className="object-btn-back">
          <span>←</span> Назад к списку
        </button>

        <h1 className="object-main-title">{exhibit.title}</h1>

        <div className="object-layout">
          <div className="object-col-left">
            <div className="object-img-box">
              <img
                src={exhibit.main_image || "/img/logo.png"}
                alt={exhibit.title}
                className="object-main-img"
              />
            </div>

            {exhibit.short_description && (
              <div className="object-short-desc">
                <p>"{exhibit.short_description}"</p>
              </div>
            )}

            {exhibit.qr_code && (
              <div className="object-qr-box">
                <div className="object-qr-img-wrap">
                  <img src={exhibit.qr_code} alt="QR Code" width="120" />
                </div>
                <div>
                  <h5 className="object-qr-title">QR экспоната</h5>
                  <button
                    onClick={() => handleDownloadQR(exhibit.qr_code, exhibit.title)}
                    className="object-btn-download"
                  >
                    Скачать
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="object-col-right">
            <div className="object-content-box">
              <h3 className="object-content-title">
                <span></span>
                История артефакта
              </h3>
              <p className="object-full-desc">{exhibit.full_description}</p>
            </div>

            {question && (
              <div className="game-box">
                <h4 className="game-title">Мини-игра: Проверь себя</h4>
                <p className="game-question">{question.question_text}</p>

                <div className="game-form">
                  <input
                    type="text"
                    className="game-input"
                    placeholder="Введите ваш ответ..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleCheckAnswer(); }}
                    disabled={checkResult?.is_correct || isSubmitting}
                  />
                  <button
                    onClick={handleCheckAnswer}
                    disabled={!answer.trim() || checkResult?.is_correct || isSubmitting}
                    className="game-btn"
                  >
                    {isSubmitting ? "Проверка..." : "Ответить"}
                  </button>
                </div>

                {checkResult && (
                  <div className={`game-result ${checkResult.is_correct ? 'game-result-success' : 'game-result-error'}`}>
                    <h5 className={checkResult.is_correct ? 'game-result-msg-success' : 'game-result-msg-error'}>
                      Ответ верный!
                    </h5>

                    {!checkResult.is_correct && checkResult.hint && (
                      <p className="game-hint">
                        <span>💡 Подсказка:</span> {checkResult.hint}
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