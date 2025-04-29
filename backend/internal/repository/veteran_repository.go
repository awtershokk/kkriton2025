package repository

import (
	"backend/internal/database/postgres/models"
	"backend/internal/domain"
	"gorm.io/gorm"
)

type veteranRepository struct {
	db *gorm.DB
}

func NewVeteranRepository(db *gorm.DB) domain.VeteranRepository {
	return &veteranRepository{db: db}
}

func (r *veteranRepository) Create(veteran *domain.Veteran) error {
	modelVeteran := models.Veteran{
		LastName:   veteran.LastName,
		FirstName:  veteran.FirstName,
		Patronymic: veteran.Patronymic,
		BirthDate:  veteran.BirthDate,
		Biography:  veteran.Biography,
	}

	if err := r.db.Create(&modelVeteran).Error; err != nil {
		return err
	}

	veteran.ID = modelVeteran.ID

	return nil
}

func (r *veteranRepository) GetById(id uint) (*domain.Veteran, error) {
	var modelVeteran models.Veteran

	if err := r.db.Where("id = ?", id).First(&modelVeteran).Error; err != nil {
		return nil, err
	}

	veteran := &domain.Veteran{
		ID:         modelVeteran.ID,
		LastName:   modelVeteran.LastName,
		FirstName:  modelVeteran.FirstName,
		Patronymic: modelVeteran.Patronymic,
		BirthDate:  modelVeteran.BirthDate,
		Biography:  modelVeteran.Biography,
	}

	return veteran, nil
}
