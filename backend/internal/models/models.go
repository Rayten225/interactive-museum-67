package models

type Exhibit struct {
	ID               int    `json:"id"`
	Title            string `json:"title"`
	ShortDescription string `json:"short_description"`
	FullDescription  string `json:"full_description"`
	MainImage        string `json:"main_image"`
	QRCode           string `json:"qr_code,omitempty"`
}

type QuizQuestion struct {
	ID            int    `json:"id"`
	ExhibitID     int    `json:"exhibit_id"`
	Text          string `json:"question_text"`
	Hint          string `json:"hint,omitempty"`
	Points        int    `json:"points"`
	CorrectAnswer string `json:"-"`
}

type TeamMember struct {
	ID           int    `json:"id"`
	Name         string `json:"name"`
	Role         string `json:"role"`
	Photo        string `json:"photo"`
	DisplayOrder int    `json:"display_order"`
}
