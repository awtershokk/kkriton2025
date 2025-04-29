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
	GetAll() ([]*Veteran, error)
}

type VeteranService interface {
	CreateVeteran(veteran *Veteran) (uint, error)
	GetAllVeterans() ([]*Veteran, error) // Новый метод для получения всех ветеранов
}
