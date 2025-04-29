package domain

type Nko struct {
	ID              uint   `json:"id"`
	Email           string `json:"email"`
	Phone           string `json:"phone"`
	Password        string `json:"-"`
	Named           string `json:"named"`
	Inn             string `json:"inn"`
	TotalEvents     int    `gorm:"-"`
	CompletedEvents int    `gorm:"-"`
}

type NkoRepository interface {
	Create(nko *Nko) error
	GetByEmail(email string) (*Nko, error)
	Login(email string, password string) (*Nko, error)
	GetById(id uint) (*Nko, error)
}

type NkoService interface {
	RegisterNko(nko *Nko) (uint, error)
	GetNkoById(id uint) (*Nko, error)
	LoginNko(email string, password string) (*Nko, error)
}
