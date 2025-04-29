package models

import "gorm.io/gorm"

type Veteran struct {
	gorm.Model
	LastName   string `gorm:"column:last_name;type:text;not null"`
	FirstName  string `gorm:"column:first_name;type:text;not null"`
	Patronymic string `gorm:"column:patronymic;type:text"`
	BirthDate  string `gorm:"column:birth_date;type:text;not null"`
	Biography  string `gorm:"column:biography;type:text"`
}

func (Veteran) TableName() string {
	return "veterans"
}
