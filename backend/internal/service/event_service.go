package service

import (
	"backend/internal/domain"
	"errors"
)

type eventService struct {
	repo domain.EventRepository
}

func NewEventService(repo domain.EventRepository) domain.EventService {
	return &eventService{repo: repo}
}

func (s *eventService) CreateEvent(event *domain.Event) (uint, error) {
	err := s.repo.Create(event)
	if err != nil {
		return 0, err
	}
	return event.ID, nil
}

func (s *eventService) GetEventByID(id uint) (*domain.Event, error) {
	event, err := s.repo.GetByID(id)
	if err != nil {
		return nil, errors.New("event not found")
	}
	if event == nil {
		return nil, errors.New("event not found")
	}
	return event, nil
}

func (s *eventService) ListEvents() ([]*domain.Event, error) {
	events, err := s.repo.List()
	if err != nil {
		return nil, err
	}
	return events, nil
}

func (s *eventService) DeleteEvent(id uint) error {
	err := s.repo.Delete(id)
	if err != nil {
		return errors.New("failed to delete event")
	}
	return nil
}
