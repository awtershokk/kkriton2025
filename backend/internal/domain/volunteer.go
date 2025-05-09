package domain

type Volunteer struct {
	ID              uint   `json:"id"`
	FullName        string `json:"full_name"`
	Email           string `json:"email"`
	Phone           string `json:"phone"`
	Password        string `json:"-"`
	TotalEvents     int    `gorm:"-"`
	CompletedEvents int    `gorm:"-"`
}

type VolunteerRepository interface {
	Create(volunteer *Volunteer) error
	Login(email string, password string) (*Volunteer, error)
	GetByEmail(email string) (*Volunteer, error)
	GetById(id uint) (*Volunteer, error)
}

type VolunteerService interface {
	RegisterVolunteer(volunteer *Volunteer) (uint, error)
	GetVolunteerById(id uint) (*Volunteer, error)
	LoginVolunteer(email string, password string) (*Volunteer, error)
}
