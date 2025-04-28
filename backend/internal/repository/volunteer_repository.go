package repository

import (
	"backend/internal/domain"
	"gorm.io/gorm"
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
	return &volunteer, nil
}
