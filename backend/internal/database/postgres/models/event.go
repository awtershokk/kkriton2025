package models

import (
	"gorm.io/gorm"
	"time"
)

type Event struct {
	gorm.Model
	Name        string    `gorm:"column:name;type:text"`
	StartTime   time.Time `gorm:"column:start_time;not null"`
	EndTime     time.Time `gorm:"column:end_time;not null"`
	Location    string    `gorm:"column:location;type:text;not null"`
	Purpose     string    `gorm:"column:purpose;type:text"`
	Description string    `gorm:"column:description;type:text"`

	NKOID *uint `gorm:"column:nko_id"`
	NKO   *NKO  `gorm:"foreignKey:NKOID"`

	VolunteerID *uint      `gorm:"column:volunteer_id"`
	Volunteer   *Volunteer `gorm:"foreignKey:VolunteerID"`
}

func (Event) TableName() string {
	return "events"
}
