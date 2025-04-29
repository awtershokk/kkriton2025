package v1

import (
	"backend/internal/domain"
	"github.com/gin-gonic/gin"
	"net/http"
)

type DonationHandler struct {
	service domain.DonationService
}

func NewDonationHandler(service domain.DonationService) *DonationHandler {
	return &DonationHandler{service: service}
}

type CreateDonationRequest struct {
	VeteranID uint    `json:"veteran_id" binding:"required"`
	Target    float64 `json:"target" binding:"required,gt=0"`
	Purpose   string  `json:"purpose" binding:"required"`
}

func (h *DonationHandler) CreateDonation(c *gin.Context) {
	var req CreateDonationRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	donation := &domain.Donation{
		VeteranID: req.VeteranID,
		Target:    req.Target,
		Collected: 0,
		Purpose:   req.Purpose,
	}

	id, err := h.service.CreateDonation(donation)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "donation created successfully",
		"id":      id,
	})
}

func (h *DonationHandler) GetAllDonations(c *gin.Context) {
	donations, err := h.service.GetAllDonations()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, donations)
}
