package v1

import (
	"backend/internal/domain"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
	"time"
)

type EventHandler struct {
	service domain.EventService
}

func NewEventHandler(service domain.EventService) *EventHandler {
	return &EventHandler{service: service}
}

type CreateEventRequest struct {
	Name        string `json:"name"`
	StartTime   string `json:"start_time" binding:"required"`
	EndTime     string `json:"end_time" binding:"required"`
	Location    string `json:"location" binding:"required"`
	Purpose     string `json:"purpose"`
	Description string `json:"description"`
	NKOID       *uint  `json:"nko_id,omitempty"`
	VolunteerID *uint  `json:"volunteer_id,omitempty"`
}

func (h *EventHandler) Create(c *gin.Context) {
	var req CreateEventRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	startTime, err := parseTime(req.StartTime)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid start_time format"})
		return
	}

	endTime, err := parseTime(req.EndTime)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid end_time format"})
		return
	}

	event := &domain.Event{
    	Name:        req.Name,
    	StartTime:   startTime,
    	EndTime:     endTime,
    	Location:    req.Location,
    	Purpose:     req.Purpose,
    	Description: req.Description,
    	NKOID:       req.NKOID,
    	VolunteerID: req.VolunteerID,
    }

	id, err := h.service.CreateEvent(event)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "event created successfully",
		"id":      id,
	})
}

func (h *EventHandler) GetByID(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid event ID"})
		return
	}

	event, err := h.service.GetEventByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, event)
}

func (h *EventHandler) List(c *gin.Context) {
	events, err := h.service.ListEvents()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, events)
}

func (h *EventHandler) Delete(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid event ID"})
		return
	}

	err = h.service.DeleteEvent(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "event deleted successfully",
	})
}

func parseTime(value string) (time.Time, error) {
	return time.Parse(time.RFC3339, value)
}
