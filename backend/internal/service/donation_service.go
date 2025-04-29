package service

import (
	"backend/internal/domain"
	"errors"
)

type donationService struct {
	repo domain.DonationRepository
}

func NewDonationService(repo domain.DonationRepository) domain.DonationService {
	return &donationService{repo: repo}
}

func (s *donationService) CreateDonation(donation *domain.Donation) (uint, error) {
	if donation.VeteranID == 0 {
		return 0, errors.New("veteran ID is required")
	}

	if donation.Target <= 0 {
		return 0, errors.New("target amount must be positive")
	}

	if donation.Purpose == "" {
		return 0, errors.New("purpose is required")
	}

	donation.Collected = 0

	err := s.repo.Create(donation)
	if err != nil {
		return 0, err
	}

	return donation.ID, nil
}

func (s *donationService) GetAllDonations() ([]domain.Donation, error) {
	donations, err := s.repo.GetAll()
	if err != nil {
		return nil, errors.New("failed to get donations")
	}

	if len(donations) == 0 {
		return nil, errors.New("no donations found")
	}

	return donations, nil
}
