package repository

import (
	"backend/internal/database/postgres/models"
	"backend/internal/domain"
	"gorm.io/gorm"
)

type donationRepository struct {
	db *gorm.DB
}

func NewDonationRepository(db *gorm.DB) domain.DonationRepository {
	return &donationRepository{db: db}
}

func (r *donationRepository) Create(donation *domain.Donation) error {
	modelDonation := models.Donation{
		VeteranID: donation.VeteranID,
		Target:    donation.Target,
		Collected: donation.Collected,
		Purpose:   donation.Purpose,
	}

	if err := r.db.Create(&modelDonation).Error; err != nil {
		return err
	}

	donation.ID = modelDonation.ID

	return nil
}

func (r *donationRepository) GetAll() ([]domain.Donation, error) {
	var modelDonations []models.Donation

	if err := r.db.Preload("Veteran").Find(&modelDonations).Error; err != nil {
		return nil, err
	}

	var donations []domain.Donation
	for _, modelDonation := range modelDonations {
		donations = append(donations, domain.Donation{
			ID:        modelDonation.ID,
			VeteranID: modelDonation.VeteranID,
			Target:    modelDonation.Target,
			Collected: modelDonation.Collected,
			Purpose:   modelDonation.Purpose,
			Veteran: &domain.Veteran{
				ID:         modelDonation.Veteran.ID,
				FirstName:  modelDonation.Veteran.FirstName,
				LastName:   modelDonation.Veteran.LastName,
				Patronymic: modelDonation.Veteran.Patronymic,
				BirthDate:  modelDonation.Veteran.BirthDate,
				Biography:  modelDonation.Veteran.Biography,
			},
		})
	}

	return donations, nil
}
