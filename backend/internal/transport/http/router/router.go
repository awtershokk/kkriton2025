package router

import (
	"backend/internal/transport/http/api/v1"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func NewRouter(volunteerHandler *v1.VolunteerHandler) *gin.Engine {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	v1Group := r.Group("/api/v1")
	{
		v1Group.POST("/volunteers/register", volunteerHandler.Register)
		v1Group.GET("/volunteers/:id", volunteerHandler.GetByID)
	}

	return r
}
