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

func (r *veteranRepository) GetAll() ([]*domain.Veteran, error) {
	var modelVeterans []models.Veteran

	// Извлекаем всех ветеранов
	if err := r.db.Find(&modelVeterans).Error; err != nil {
		return nil, err
	}

	// Преобразуем модель в доменную сущность
	var veterans []*domain.Veteran
	for _, modelVeteran := range modelVeterans {
		veteran := &domain.Veteran{
			ID:         modelVeteran.ID,
			LastName:   modelVeteran.LastName,
			FirstName:  modelVeteran.FirstName,
			Patronymic: modelVeteran.Patronymic,
			BirthDate:  modelVeteran.BirthDate,
			Biography:  modelVeteran.Biography,
		}
		veterans = append(veterans, veteran)
	}

	return veterans, nil
}
