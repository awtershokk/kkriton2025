package main

import (
	"backend/internal/repository"
	"backend/internal/service"
	v1 "backend/internal/transport/http/api/v1"
	"backend/internal/transport/http/router"
	"backend/pkg/database/postgres"
	"log"
)

func main() {
	cfg, err := postgres.LoadConfig()
	if err != nil {
		log.Fatalf("failed to load config: %v", err)
	}

	db, err := postgres.NewDB(cfg)
	if err != nil {
		log.Fatalf("failed to connect to db: %v", err)
	}

	volunteerRepo := repository.NewVolunteerRepository(db)
	volunteerService := service.NewVolunteerService(volunteerRepo)
	volunteerHandler := v1.NewVolunteerHandler(volunteerService)

	eventRepo := repository.NewEventRepository(db)
	eventService := service.NewEventService(eventRepo)
	eventHandler := v1.NewEventHandler(eventService)

	r := router.NewRouter(volunteerHandler, eventHandler)

	if err := r.Run(":8080"); err != nil {
		log.Fatalf("failed to run server: %v", err)
	}
}
