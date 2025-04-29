package v1

import (
	"backend/internal/domain"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type VeteranHandler struct {
	service domain.VeteranService
}

func NewVeteranHandler(service domain.VeteranService) *VeteranHandler {
	return &VeteranHandler{service: service}
}

type CreateVeteranRequest struct {
	LastName   string `json:"last_name" binding:"required"`
	FirstName  string `json:"first_name" binding:"required"`
	Patronymic string `json:"patronymic"`
	BirthDate  string `json:"birth_date" binding:"required"`
	Biography  string `json:"biography"`
}

func (h *VeteranHandler) CreateVeteran(c *gin.Context) {
	var req CreateVeteranRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	veteran := &domain.Veteran{
		LastName:   req.LastName,
		FirstName:  req.FirstName,
		Patronymic: req.Patronymic,
		BirthDate:  req.BirthDate,
		Biography:  req.Biography,
	}

	id, err := h.service.CreateVeteran(veteran)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "veteran created successfully",
		"id":      id,
	})
}

func (h *VeteranHandler) GetVeteranByID(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid veteran ID"})
		return
	}

	veteran, err := h.service.GetVeteranById(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, veteran)
}
