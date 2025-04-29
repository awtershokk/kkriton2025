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
