package models

import "gorm.io/gorm"

type NKO struct {
	gorm.Model
	Email    string `gorm:"column:email;uniqueIndex;type:text;not null"`
	Phone    string `gorm:"column:phone;type:text;not null"`
	Password string `gorm:"column:password;type:text;not null"`
	Named    string `gorm:"column:named;type:text;not null"`
	INN      string `gorm:"column:inn;type:text;not null"`
}

func (NKO) TableName() string {
	return "nkos"
}
