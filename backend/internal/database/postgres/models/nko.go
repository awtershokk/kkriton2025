package models

import "gorm.io/gorm"

type NKO struct {
	gorm.Model
	FullName string `gorm:"column:full_name;type:text;not null"`
	Email    string `gorm:"column:email;uniqueIndex;type:text;not null"`
	Phone    string `gorm:"column:phone;type:text;not null"`
	Password string `gorm:"column:password;type:text;not null"`
}

func (NKO) TableName() string {
	return "nkos"
}
