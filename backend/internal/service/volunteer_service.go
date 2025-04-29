package service

import (
	"backend/internal/domain"
	"errors"
)

type volunteerService struct {
	repo domain.VolunteerRepository
}

func NewVolunteerService(repo domain.VolunteerRepository) domain.VolunteerService {
	return &volunteerService{repo: repo}
}

func (s *volunteerService) RegisterVolunteer(volunteer *domain.Volunteer) (uint, error) {
	existing, _ := s.repo.GetByEmail(volunteer.Email)
	if existing != nil {
		return 0, errors.New("volunteer with this email already exists")
	}
	err := s.repo.Create(volunteer)
	if err != nil {
		return 0, err
	}
	return volunteer.ID, nil
}

func (s *volunteerService) GetVolunteerById(id uint) (*domain.Volunteer, error) {
	volunteer, err := s.repo.GetById(id)
	if err != nil {
		return nil, errors.New("volunteer not found")
	}
	if volunteer == nil {
		return nil, errors.New("volunteer not found")
	}
	return volunteer, nil
}

func (s *volunteerService) LoginVolunteer(email string, password string) (*domain.Volunteer, error) {
	volunteer, err := s.repo.Login(email, password)
	if err != nil {
		return nil, errors.New("volunteer not found")
	}
	if volunteer == nil {
		return nil, errors.New("volunteer not found")
	}
	return volunteer, nil
}
