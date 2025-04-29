package v1

import (
	"backend/internal/domain"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type VolunteerHandler struct {
	service domain.VolunteerService
}

func NewVolunteerHandler(service domain.VolunteerService) *VolunteerHandler {
	return &VolunteerHandler{service: service}
}

type LoginVolunteerRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type RegisterVolunteerRequest struct {
	FullName string `json:"full_name" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Phone    string `json:"phone" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func (h *VolunteerHandler) Register(c *gin.Context) {
	var req RegisterVolunteerRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	volunteer := &domain.Volunteer{
		FullName: req.FullName,
		Email:    req.Email,
		Phone:    req.Phone,
		Password: req.Password,
	}

	id, err := h.service.RegisterVolunteer(volunteer)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "volunteer registered successfully",
		"id":      id,
	})
}

func (h *VolunteerHandler) GetByID(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid volunteer ID"})
		return
	}

	volunteer, err := h.service.GetVolunteerById(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	volunteer.Password = ""

	c.JSON(http.StatusOK, volunteer)
}

func (h *VolunteerHandler) Login(c *gin.Context) {
	var req LoginVolunteerRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	volunteer, err := h.service.LoginVolunteer(req.Email, req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid email or password"})
		return
	}

	volunteer.Password = ""

	c.JSON(http.StatusOK, volunteer)
}
