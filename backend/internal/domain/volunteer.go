package domain

type Volunteer struct {
	ID       uint   `json:"id"`
	FullName string `json:"full_name"`
	Email    string `json:"email"`
	Phone    string `json:"phone"`
	Password string `json:"-"`
}

type VolunteerRepository interface {
	Create(volunteer *Volunteer) error
	GetByEmail(email string) (*Volunteer, error)
	GetById(id uint) (*Volunteer, error)
}

type VolunteerService interface {
	RegisterVolunteer(volunteer *Volunteer) (uint, error)
	GetVolunteerById(id uint) (*Volunteer, error)
}
