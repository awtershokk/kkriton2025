package models

import "gorm.io/gorm"

type Donation struct {
	gorm.Model
	VeteranID uint    `gorm:"column:veteran_id;not null"`
	Target    float64 `gorm:"column:target;type:decimal(10,2);not null"`
	Collected float64 `gorm:"column:collected;type:decimal(10,2);not null;default:0"`
	Purpose   string  `gorm:"column:purpose;type:text;not null"`
	Veteran   Veteran `gorm:"foreignKey:VeteranID"`
}

func (Donation) TableName() string {
	return "donations"
}
