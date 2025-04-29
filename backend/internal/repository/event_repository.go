package repository

import (
	"backend/internal/database/postgres/models"
	"backend/internal/domain"
	"gorm.io/gorm"
)

type eventRepository struct {
	db *gorm.DB
}

func NewEventRepository(db *gorm.DB) domain.EventRepository {
	return &eventRepository{db: db}
}

func (r *eventRepository) Create(event *domain.Event) error {
	model := models.Event{
		Name:        event.Name,
		StartTime:   event.StartTime,
		EndTime:     event.EndTime,
		Location:    event.Location,
		Purpose:     event.Purpose,
		Description: event.Description,
		NKOID:       event.NKOID,
		VolunteerID: event.VolunteerID,
	}
	return r.db.Create(&model).Error
}

func (r *eventRepository) GetByID(id uint) (*domain.Event, error) {
	var model models.Event
	err := r.db.First(&model, id).Error
	if err != nil {
		return nil, err
	}

	return &domain.Event{
		Name:        model.Name,
		ID:          model.ID,
		StartTime:   model.StartTime,
		EndTime:     model.EndTime,
		Location:    model.Location,
		Purpose:     model.Purpose,
		Description: model.Description,
		NKOID:       model.NKOID,
		VolunteerID: model.VolunteerID,
	}, nil
}

func (r *eventRepository) List() ([]*domain.Event, error) {
	var modelsList []models.Event
	err := r.db.Preload("NKO").Preload("Volunteer").Find(&modelsList).Error
	if err != nil {
		return nil, err
	}

	var events []*domain.Event
	for _, m := range modelsList {
		event := &domain.Event{
			Name:        m.Name,
			ID:          m.ID,
			StartTime:   m.StartTime,
			EndTime:     m.EndTime,
			Location:    m.Location,
			Purpose:     m.Purpose,
			Description: m.Description,
			NKOID:       m.NKOID,
			VolunteerID: m.VolunteerID,
		}

		if m.NKO != nil {
			event.NKO = &domain.Nko{
				ID:    m.NKO.ID,
				Named: m.NKO.Named,
			}
		}

		if m.Volunteer != nil {
			event.Volunteer = &domain.Volunteer{
				ID:       m.Volunteer.ID,
				FullName: m.Volunteer.FullName,
			}
		}

		events = append(events, event)
	}

	return events, nil
}

func (r *eventRepository) Delete(id uint) error {
	return r.db.Delete(&models.Event{}, id).Error
}
