package domain

import "time"

type Event struct {
	Name        string    `json:"name"`
	ID          uint      `json:"id"`
	StartTime   time.Time `json:"start_time"`
	EndTime     time.Time `json:"end_time"`
	Location    string    `json:"location"`
	Purpose     string    `json:"purpose"`
	Description string    `json:"description"`

	NKOID       *uint `json:"nko_id,omitempty"`
	VolunteerID *uint `json:"volunteer_id,omitempty"`

	NKO       *Nko       `json:"nko,omitempty"`
	Volunteer *Volunteer `json:"volunteer,omitempty"`
}

type EventRepository interface {
	Create(event *Event) error
	GetByID(id uint) (*Event, error)
	List() ([]*Event, error)
	Delete(id uint) error
}

type EventService interface {
	CreateEvent(event *Event) (uint, error)
	GetEventByID(id uint) (*Event, error)
	ListEvents() ([]*Event, error)
	DeleteEvent(id uint) error
}
