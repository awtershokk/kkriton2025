package service

import (
	"backend/internal/domain"
	"errors"
)

type veteranService struct {
	repo domain.VeteranRepository
}

func NewVeteranService(repo domain.VeteranRepository) domain.VeteranService {
	return &veteranService{repo: repo}
}

func (s *veteranService) CreateVeteran(veteran *domain.Veteran) (uint, error) {
	if veteran.FirstName == "" || veteran.LastName == "" {
		return 0, errors.New("first name and last name are required")
	}

	if veteran.BirthDate == "" {
		return 0, errors.New("birth date is required")
	}

	err := s.repo.Create(veteran)
	if err != nil {
		return 0, err
	}

	return veteran.ID, nil
}

func (s *veteranService) GetVeteranById(id uint) (*domain.Veteran, error) {
	veteran, err := s.repo.GetById(id)
	if err != nil {
		return nil, errors.New("veteran not found")
	}

	if veteran == nil {
		return nil, errors.New("veteran not found")
	}

	return veteran, nil
}
