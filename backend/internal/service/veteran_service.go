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

func (s *veteranService) GetAllVeterans() ([]*domain.Veteran, error) {
	veterans, err := s.repo.GetAll()
	if err != nil {
		return nil, errors.New("ошибка при получении списка ветеранов")
	}

	if veterans == nil || len(veterans) == 0 {
		return nil, errors.New("ветераны не найдены")
	}

	return veterans, nil
}
