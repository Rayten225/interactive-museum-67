// Package main является точкой входа в приложение.
package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/interactive-museum-67/internal/handlers"
	"github.com/joho/godotenv"
)

func main() {
	// 1. Загрузка переменных окружения из файла .env (если он есть)
	if err := godotenv.Load(); err != nil {
		log.Println("⚠️ Файл .env не найден, используются системные переменные окружения")
	}

	// 2. Чтение конфигурации с фолбэками (дефолтными значениями)
	dsn := os.Getenv("DB_DSN")
	if dsn == "" {
		dsn = "root:123456@tcp(127.0.0.1:3306)/museum_db" // Значение по умолчанию
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}

	// 3. Инициализация пула соединений с БД
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("❌ Ошибка инициализации пула соединений с БД: ", err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		log.Fatal("❌ Ошибка подключения к БД (сервер недоступен): ", err)
	}
	log.Println("✅ Успешное подключение к MySQL")

	// 4. Подготовка структуры БД и базовых данных
	InitDB(db)
	seedData(db)

	// 5. Инициализация слоя обработчиков
	h := handlers.New(db)

	// 6. Настройка маршрутизатора
	mux := http.NewServeMux()

	// Публичные эндпоинты API
	mux.HandleFunc("GET /api/exhibits", h.GetExhibits)
	mux.HandleFunc("GET /api/exhibits/{id}", h.GetExhibitByID)
	mux.HandleFunc("POST /api/game/check", h.CheckAnswer)

	// Защищенные эндпоинты API (панель администратора)
	mux.HandleFunc("POST /api/exhibits", h.CreateExhibit)
	mux.HandleFunc("PUT /api/exhibits/{id}", h.UpdateExhibit)
	mux.HandleFunc("DELETE /api/exhibits/{id}", h.DeleteExhibit)

	handler := enableCORS(mux)

	// 7. Запуск HTTP-сервера
	log.Printf("🚀 Бэкенд запущен на порту %s...\n", port)
	if err := http.ListenAndServe(":"+port, handler); err != nil {
		log.Fatal("❌ Ошибка работы сервера: ", err)
	}
}

// enableCORS добавляет заголовки для обхода Same-Origin Policy (SOP).
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// seedData проверяет базу и заполняет её базовым набором данных.
func seedData(db *sql.DB) {
	var count int
	if err := db.QueryRow("SELECT COUNT(*) FROM exhibits").Scan(&count); err != nil {
		log.Println("❌ Ошибка проверки наличия данных:", err)
		return
	}

	if count > 0 {
		return // Данные уже есть, ничего не делаем
	}

	res, err := db.Exec(`INSERT INTO exhibits (title, short_description, full_description, main_image)
		VALUES ('Шигирский идол', 'Древняя скульптура', 'Самая древняя в мире деревянная скульптура, сделана из лиственницы.', 'https://via.placeholder.com/150')`)
	if err != nil {
		log.Println("❌ Ошибка при вставке тестового экспоната:", err)
		return
	}

	log.Println("✅ Тестовый экспонат успешно добавлен.")

	exhibitID, _ := res.LastInsertId()

	_, err = db.Exec(`INSERT INTO quiz_questions (exhibit_id, question_text, correct_answer, hint, points)
		VALUES (?, 'Из какого дерева сделан идол?', 'лиственница', 'Дерево хвойной породы, сбрасывающее иголки на зиму', 10)`, exhibitID)
	if err != nil {
		log.Println("❌ Ошибка при вставке тестового вопроса:", err)
		return
	}

	log.Println("✅ Тестовый вопрос для игры успешно добавлен.")
}

// InitDB применяет схему базы данных.
func InitDB(db *sql.DB) {
	queryExhibits := `
	CREATE TABLE IF NOT EXISTS exhibits (
		id INT AUTO_INCREMENT PRIMARY KEY,
		title VARCHAR(255) NOT NULL,
		short_description TEXT,
		full_description LONGTEXT,
		main_image VARCHAR(500),
		qr_code VARCHAR(255),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);`
	if _, err := db.Exec(queryExhibits); err != nil {
		log.Fatal("❌ Ошибка инициализации таблицы exhibits: ", err)
	}

	queryQuestions := `
	CREATE TABLE IF NOT EXISTS quiz_questions (
		id INT AUTO_INCREMENT PRIMARY KEY,
		exhibit_id INT NOT NULL,
		question_text TEXT NOT NULL,
		correct_answer VARCHAR(255) NOT NULL,
		hint TEXT,
		points INT DEFAULT 1,
		FOREIGN KEY (exhibit_id) REFERENCES exhibits(id) ON DELETE CASCADE
	);`
	if _, err := db.Exec(queryQuestions); err != nil {
		log.Fatal("❌ Ошибка инициализации таблицы quiz_questions: ", err)
	}

	queryTeam := `
	CREATE TABLE IF NOT EXISTS team_members (
		id INT AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		role VARCHAR(255) NOT NULL,
		photo VARCHAR(500),
		display_order INT DEFAULT 0
	);`
	if _, err := db.Exec(queryTeam); err != nil {
		log.Fatal("❌ Ошибка инициализации таблицы team_members: ", err)
	}

	log.Println("✅ Схема базы данных успешно проверена и применена.")
}
