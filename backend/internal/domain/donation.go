package domain

type Donation struct {
	ID        uint     `json:"id"`
	VeteranID uint     `json:"veteran_id"`
	Target    float64  `json:"target"`
	Collected float64  `json:"collected"`
	Purpose   string   `json:"purpose"`
	Veteran   *Veteran `json:"veteran"`
}

type DonationRepository interface {
	Create(donation *Donation) error
	GetAll() ([]Donation, error)
}

type DonationService interface {
	CreateDonation(donation *Donation) (uint, error)
	GetAllDonations() ([]Donation, error)
}
