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

	nkoRepo := repository.NewNkoRepository(db)
	nkoService := service.NewNkoService(nkoRepo)
	nkoHandler := v1.NewNkoHandler(nkoService)

	veteranRepo := repository.NewVeteranRepository(db)
	veteranService := service.NewVeteranService(veteranRepo)
	veteranHandler := v1.NewVeteranHandler(veteranService)

	donationRepo := repository.NewDonationRepository(db)
	donationService := service.NewDonationService(donationRepo)
	donationHandler := v1.NewDonationHandler(donationService)

	r := router.NewRouter(volunteerHandler, eventHandler, nkoHandler, veteranHandler, donationHandler)

	if err := r.Run(":8080"); err != nil {
		log.Fatalf("failed to run server: %v", err)
	}
}
