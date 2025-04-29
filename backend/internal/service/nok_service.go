package service

import (
	"backend/internal/domain"
	"errors"
)

type nkoService struct {
	repo domain.NkoRepository
}

func NewNkoService(repo domain.NkoRepository) domain.NkoService {
	return &nkoService{repo: repo}
}

func (s *nkoService) RegisterNko(nko *domain.Nko) (uint, error) {
	existing, _ := s.repo.GetByEmail(nko.Email)
	if existing != nil {
		return 0, errors.New("nko with this email already exists")
	}
	err := s.repo.Create(nko)
	if err != nil {
		return 0, err
	}
	return nko.ID, nil
}

func (s *nkoService) GetNkoById(id uint) (*domain.Nko, error) {
	nko, err := s.repo.GetById(id)
	if err != nil {
		return nil, errors.New("nko not found")
	}
	if nko == nil {
		return nil, errors.New("nko not found")
	}
	return nko, nil
}

func (s *nkoService) LoginNko(email string, password string) (*domain.Nko, error) {
	nko, err := s.repo.Login(email, password)
	if err != nil {
		return nil, errors.New("nko not found")
	}
	if nko == nil {
		return nil, errors.New("nko not found")
	}
	return nko, nil
}
