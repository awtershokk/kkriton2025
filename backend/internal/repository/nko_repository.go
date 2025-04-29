package repository

import (
	"backend/internal/database/postgres/models"
	"backend/internal/domain"
	"gorm.io/gorm"
	"time"
)

type nkoRepository struct {
	db *gorm.DB
}

func NewNkoRepository(db *gorm.DB) domain.NkoRepository {
	return &nkoRepository{db: db}
}

func (r *nkoRepository) Create(volunteer *domain.Nko) error {
	return r.db.Create(volunteer).Error
}

func (r *nkoRepository) GetByEmail(email string) (*domain.Nko, error) {
	var nko domain.Nko
	err := r.db.Where("email = ?", email).First(&nko).Error
	if err != nil {
		return nil, err
	}
	return &nko, nil
}
func (r *nkoRepository) Login(email string, password string) (*domain.Nko, error) {
	var nko domain.Nko
	err := r.db.Where("email = ? AND password = ?", email, password).First(&nko).Error
	if err != nil {
		return nil, err
	}
	return &nko, nil
}

func (r *nkoRepository) GetById(id uint) (*domain.Nko, error) {
	var nko domain.Nko
	err := r.db.Where("id = ?", id).First(&nko).Error
	if err != nil {
		return nil, err
	}

	var totalEvents int64
	err = r.db.Model(&models.Event{}).Where("nko_id = ?", id).Count(&totalEvents).Error
	if err != nil {
		return nil, err
	}

	var completedEvents int64
	err = r.db.Model(&models.Event{}).
		Where("nko_id = ? AND end_time < ?", id, time.Now()).
		Count(&completedEvents).Error
	if err != nil {
		return nil, err
	}

	nko.TotalEvents = int(totalEvents)
	nko.CompletedEvents = int(completedEvents)

	return &nko, nil
}
