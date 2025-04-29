package repository

import (
	"backend/internal/database/postgres/models"
	"backend/internal/domain"
	"gorm.io/gorm"
	"time"
)

type volunteerRepository struct {
	db *gorm.DB
}

func NewVolunteerRepository(db *gorm.DB) domain.VolunteerRepository {
	return &volunteerRepository{db: db}
}

func (r *volunteerRepository) Create(volunteer *domain.Volunteer) error {
	return r.db.Create(volunteer).Error
}

func (r *volunteerRepository) Login(email string, password string) (*domain.Volunteer, error) {
	var volunteer domain.Volunteer
	err := r.db.Where("email = ? AND password = ?", email, password).First(&volunteer).Error
	if err != nil {
		return nil, err
	}
	return &volunteer, nil
}

func (r *volunteerRepository) GetByEmail(email string) (*domain.Volunteer, error) {
	var volunteer domain.Volunteer
	err := r.db.Where("email = ?", email).First(&volunteer).Error
	if err != nil {
		return nil, err
	}
	return &volunteer, nil
}

func (r *volunteerRepository) GetById(id uint) (*domain.Volunteer, error) {
	var volunteer domain.Volunteer
	err := r.db.Where("id = ?", id).First(&volunteer).Error
	if err != nil {
		return nil, err
	}

	var totalEvents int64
	err = r.db.Model(&models.Event{}).Where("volunteer_id = ?", id).Count(&totalEvents).Error
	if err != nil {
		return nil, err
	}

	var completedEvents int64
	err = r.db.Model(&models.Event{}).
		Where("volunteer_id = ? AND end_time < ?", id, time.Now()).
		Count(&completedEvents).Error
	if err != nil {
		return nil, err
	}

	volunteer.TotalEvents = int(totalEvents)
	volunteer.CompletedEvents = int(completedEvents)

	return &volunteer, nil
}
