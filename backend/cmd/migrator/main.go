package main

import (
	"log"

	"backend/internal/database/postgres/models"
	"backend/pkg/database/postgres"
)

func main() {
	cfg, err := postgres.LoadConfig()
	if err != nil {
		log.Fatalf("failed to load config: %v", err)
	}

	db, err := postgres.NewDB(cfg)
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}

	err = db.AutoMigrate(
		&models.Volunteer{},
		&models.NKO{},
	)
	if err != nil {
		log.Fatalf("failed to auto-migrate models: %v", err)
	}

	log.Println("Migration completed successfully")
}
