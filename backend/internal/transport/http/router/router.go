package router

import (
	"backend/internal/transport/http/api/v1"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func NewRouter(
	volunteerHandler *v1.VolunteerHandler,
	eventHandler *v1.EventHandler,
	nkoHandler *v1.NkoHandler,
) *gin.Engine {
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
		v1Group.POST("/volunteers/login", volunteerHandler.Login)
		v1Group.GET("/volunteers/:id", volunteerHandler.GetByID)

		v1Group.POST("/events", eventHandler.Create)
		v1Group.GET("/events/:id", eventHandler.GetByID)
		v1Group.GET("/events", eventHandler.List)
		v1Group.DELETE("/events/:id", eventHandler.Delete)

		v1Group.POST("/nko/register", nkoHandler.Register)
		v1Group.POST("/nko/login", nkoHandler.Login)

		v1Group.GET("/nko/:id", nkoHandler.GetByID)
	}

	return r
}
