// Package handlers содержит логику обработки HTTP-запросов.
// Он отвечает за извлечение данных из базы, бизнес-логику (например, проверку ответов)
// и формирование JSON-ответов для клиентского приложения (фронтенда).
package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/interactive-museum-67/internal/models"
)

// Handler инкапсулирует зависимости, необходимые для обработки запросов.
// В данном случае основной зависимостью является пул соединений с базой данных.
type Handler struct {
	DB *sql.DB
}

// New создает и возвращает новый экземпляр Handler с внедренной зависимостью БД.
func New(db *sql.DB) *Handler {
	return &Handler{DB: db}
}

// GetExhibits обрабатывает GET-запросы на получение списка всех экспонатов музея.
// Возвращает массив объектов Exhibit в формате JSON.
func (h *Handler) GetExhibits(w http.ResponseWriter, r *http.Request) {
	rows, err := h.DB.Query("SELECT id, title, short_description, full_description, main_image, qr_code FROM exhibits")
	if err != nil {
		log.Println("Ошибка запроса экспонатов:", err)
		http.Error(w, "Внутренняя ошибка сервера", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	exhibits := make([]models.Exhibit, 0)
	for rows.Next() {
		var e models.Exhibit
		var shortDesc, fullDesc, img, qr sql.NullString

		if err := rows.Scan(&e.ID, &e.Title, &shortDesc, &fullDesc, &img, &qr); err != nil {
			log.Println("Ошибка сканирования строки экспоната:", err)
			continue
		}

		// Обработка потенциально пустых (NULL) полей в базе данных.
		if shortDesc.Valid {
			e.ShortDescription = shortDesc.String
		}
		if fullDesc.Valid {
			e.FullDescription = fullDesc.String
		}
		if img.Valid {
			e.MainImage = img.String
		}
		if qr.Valid {
			e.QRCode = qr.String
		}

		exhibits = append(exhibits, e)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(exhibits)
}

// GetExhibitByID обрабатывает GET-запросы на получение детальной информации
// о конкретном экспонате по его идентификатору, переданному в параметрах URL.
// Если к экспонату привязан интерактивный вопрос, он также включается в ответ.
func (h *Handler) GetExhibitByID(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")

	var e models.Exhibit
	var shortDesc, fullDesc, img, qr sql.NullString

	err := h.DB.QueryRow("SELECT id, title, short_description, full_description, main_image, qr_code FROM exhibits WHERE id = ?", id).
		Scan(&e.ID, &e.Title, &shortDesc, &fullDesc, &img, &qr)

	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Экспонат не найден", http.StatusNotFound)
			return
		}
		log.Println("Ошибка получения экспоната по ID:", err)
		http.Error(w, "Внутренняя ошибка сервера", http.StatusInternalServerError)
		return
	}

	if shortDesc.Valid {
		e.ShortDescription = shortDesc.String
	}
	if fullDesc.Valid {
		e.FullDescription = fullDesc.String
	}
	if img.Valid {
		e.MainImage = img.String
	}
	if qr.Valid {
		e.QRCode = qr.String
	}

	// Поиск привязанного вопроса для интерактивной игры.
	var q models.QuizQuestion
	var hint sql.NullString
	err = h.DB.QueryRow("SELECT id, exhibit_id, question_text, hint, points FROM quiz_questions WHERE exhibit_id = ?", id).
		Scan(&q.ID, &q.ExhibitID, &q.Text, &hint, &q.Points)

	if err == nil && hint.Valid {
		q.Hint = hint.String
	}

	// Формирование комплексного ответа.
	response := map[string]interface{}{
		"exhibit": e,
	}
	if err == nil {
		response["question"] = q
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// CheckAnswer обрабатывает POST-запросы мини-игры. Сравнивает ответ пользователя
// с эталонным ответом в базе данных. Возвращает статус (верно/неверно), начисленные
// баллы и подсказку в случае ошибки.
func (h *Handler) CheckAnswer(w http.ResponseWriter, r *http.Request) {
	var req struct {
		ExhibitID int    `json:"exhibit_id"`
		Answer    string `json:"answer"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Неверный формат тела запроса", http.StatusBadRequest)
		return
	}

	var correctAnswer string
	var hint sql.NullString
	var points int

	err := h.DB.QueryRow("SELECT correct_answer, hint, points FROM quiz_questions WHERE exhibit_id = ?", req.ExhibitID).
		Scan(&correctAnswer, &hint, &points)

	if err != nil {
		http.Error(w, "Вопрос для указанного экспоната не найден", http.StatusNotFound)
		return
	}

	// Нормализация строк для исключения ошибок при проверке (регистр, пробелы).
	userAns := strings.ToLower(strings.TrimSpace(req.Answer))
	correctAns := strings.ToLower(strings.TrimSpace(correctAnswer))
	isCorrect := userAns == correctAns

	resp := map[string]interface{}{
		"is_correct": isCorrect,
	}

	if isCorrect {
		resp["points"] = points
		resp["message"] = "Верный ответ"
	} else {
		resp["points"] = 0
		resp["message"] = "Ответ неверный. Попробуйте еще раз."
		if hint.Valid {
			resp["hint"] = hint.String
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

// CreateExhibit обрабатывает защищенные POST-запросы от панели администратора (CMS).
// Создает новую запись экспоната и автоматически генерирует для него QR-код,
// ссылающийся на клиентское веб-приложение.
func (h *Handler) CreateExhibit(w http.ResponseWriter, r *http.Request) {
	// Авторизация по Bearer-токену.
	authHeader := r.Header.Get("Authorization")
	expectedToken := "Bearer " + os.Getenv("ADMIN_SECRET")
	if authHeader != expectedToken {
		http.Error(w, "Доступ запрещен. Отсутствует или недействителен токен авторизации.", http.StatusUnauthorized)
		return
	}

	var req models.Exhibit
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Неверный формат JSON", http.StatusBadRequest)
		return
	}

	// Вставка основной информации об экспонате.
	query := `INSERT INTO exhibits (title, short_description, full_description, main_image) VALUES (?, ?, ?, ?)`
	res, err := h.DB.Exec(query, req.Title, req.ShortDescription, req.FullDescription, req.MainImage)
	if err != nil {
		log.Println("Ошибка транзакции (вставка экспоната):", err)
		http.Error(w, "Внутренняя ошибка сервера", http.StatusInternalServerError)
		return
	}

	id, _ := res.LastInsertId()

	// Динамическая генерация QR-кода на основе ID экспоната.
	// Примечание: baseURL необходимо заменить на production-домен перед деплоем.
	frontendURL := fmt.Sprintf("http://localhost:8081/exhibit/%d", id)
	qrURL := fmt.Sprintf("https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=%s", frontendURL)

	// Обновление записи с добавлением сгенерированной ссылки на QR-код.
	_, err = h.DB.Exec("UPDATE exhibits SET qr_code = ? WHERE id = ?", qrURL, id)
	if err != nil {
		log.Println("Ошибка обновления записи QR-кодом:", err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Экспонат успешно инициализирован",
		"id":      id,
		"qr_code": qrURL,
	})
}

// UpdateExhibit обрабатывает защищенные PUT-запросы для обновления существующих экспонатов.
func (h *Handler) UpdateExhibit(w http.ResponseWriter, r *http.Request) {
	// Проверка авторизации.
	if r.Header.Get("Authorization") != "Bearer super-museum-secret" {
		http.Error(w, "Доступ запрещен. Неверный токен.", http.StatusUnauthorized)
		return
	}

	id := r.PathValue("id")
	if id == "" {
		http.Error(w, "ID экспоната обязателен", http.StatusBadRequest)
		return
	}

	var req models.Exhibit
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Неверный формат JSON", http.StatusBadRequest)
		return
	}

	query := `UPDATE exhibits SET title = ?, short_description = ?, full_description = ?, main_image = ? WHERE id = ?`
	res, err := h.DB.Exec(query, req.Title, req.ShortDescription, req.FullDescription, req.MainImage, id)

	if err != nil {
		log.Println("Ошибка обновления экспоната:", err)
		http.Error(w, "Внутренняя ошибка сервера", http.StatusInternalServerError)
		return
	}

	// Проверяем, был ли вообще найден такой экспонат
	rowsAffected, _ := res.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "Экспонат не найден или данные не изменились", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Экспонат успешно обновлен",
	})
}

// DeleteExhibit обрабатывает защищенные DELETE-запросы для удаления экспоната.
// Благодаря ON DELETE CASCADE в базе данных, связанные вопросы удалятся автоматически.
func (h *Handler) DeleteExhibit(w http.ResponseWriter, r *http.Request) {
	// Проверка авторизации.
	if r.Header.Get("Authorization") != "Bearer super-museum-secret" {
		http.Error(w, "Доступ запрещен. Неверный токен.", http.StatusUnauthorized)
		return
	}

	id := r.PathValue("id")
	if id == "" {
		http.Error(w, "ID экспоната обязателен", http.StatusBadRequest)
		return
	}

	// Удаляем запись.
	res, err := h.DB.Exec("DELETE FROM exhibits WHERE id = ?", id)
	if err != nil {
		log.Println("Ошибка удаления экспоната:", err)
		http.Error(w, "Внутренняя ошибка сервера", http.StatusInternalServerError)
		return
	}

	rowsAffected, _ := res.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "Экспонат не найден", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Экспонат и связанные с ним вопросы успешно удалены",
	})
}
