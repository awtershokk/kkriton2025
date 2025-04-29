package v1

import (
	"backend/internal/domain"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type NkoHandler struct {
	service domain.NkoService
}

func NewNkoHandler(service domain.NkoService) *NkoHandler {
	return &NkoHandler{service: service}
}

type RegisterNkoRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Phone    string `json:"phone" binding:"required"`
	Password string `json:"password" binding:"required"`
	Named    string `json:"named" binding:"required"`
	Inn      string `json:"inn" binding:"required"`
}

func (h *NkoHandler) Register(c *gin.Context) {
	var req RegisterNkoRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	nko := &domain.Nko{
		Email:    req.Email,
		Phone:    req.Phone,
		Password: req.Password,
		Named:    req.Named,
		Inn:      req.Inn,
	}

	id, err := h.service.RegisterNko(nko)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "nko registered successfully",
		"id":      id,
	})
}

func (h *NkoHandler) GetByID(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid NKO ID"})
		return
	}

	nko, err := h.service.GetNkoById(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	nko.Password = ""

	c.JSON(http.StatusOK, nko)
}
