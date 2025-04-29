package domain

type Veteran struct {
	ID         uint   `json:"id"`
	LastName   string `json:"last_name"`
	FirstName  string `json:"first_name"`
	Patronymic string `json:"patronymic"`
	BirthDate  string `json:"birth_date"`
	Biography  string `json:"biography"`
}

type VeteranRepository interface {
	Create(veteran *Veteran) error
	GetById(id uint) (*Veteran, error)
}

type VeteranService interface {
	CreateVeteran(veteran *Veteran) (uint, error)
	GetVeteranById(id uint) (*Veteran, error)
}
