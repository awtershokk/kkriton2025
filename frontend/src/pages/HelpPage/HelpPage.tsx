import React, { useEffect, useState } from "react";
import Layout from "../../layouts/DefaultLayout.tsx";
import { useNavigate } from "react-router-dom";

interface Veteran {
    first_name: string;
    last_name: string;
    patronymic: string;
    birth_date: string;
    biography: string;
}

interface Donation {
    id: number;
    veteran_id: number;
    target: number;
    collected: number;
    purpose: string;
    veteran: Veteran;
}

const HelpPage = () => {
    const navigate = useNavigate();
    const [donations, setDonations] = useState<Donation[] | null>(null);
    const [editingDonationId, setEditingDonationId] = useState<number | null>(null); // Track donation being edited
    const [donationAmount, setDonationAmount] = useState<number | string>(""); // Store input amount for donation
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Track if submitting to prevent multiple submissions

    // Fetch donations when the component loads or after the submission of donation
    const fetchDonations = () => {
        fetch("https://api.ctrlstudio.tech/api/v1/donations")
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setDonations(data);
                }
            })
            .catch((error) => {
                console.error("Ошибка получения данных о пожертвованиях:", error);
            });
    };

    useEffect(() => {
        fetchDonations(); // Initial fetch
    }, []);

    // Функция для вычисления возраста на основе даты рождения
    const calculateAge = (birthDate: string) => {
        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDifference = today.getMonth() - birth.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    };

    const handleCreateEvent = () => {
        navigate('/help/create');
    };

    const handleSupportClick = (donationId: number, currentCollected: number) => {
        setEditingDonationId(donationId); // Set the donation being edited
        setDonationAmount(currentCollected); // Set current collected value as starting value
    };

    const handleDonationAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDonationAmount(value === "" ? "" : Number(value)); // Allow clearing of input
    };

    const handleDonationSubmit = (donationId: number) => {
        // Ensure the donation amount is at least 100 and valid
        if (donationAmount && !isNaN(Number(donationAmount)) && Number(donationAmount) >= 100) {
            const updatedCollected = Number(donationAmount);

            setIsSubmitting(true); // Set submitting to true to prevent multiple submissions

            fetch(`https://api.ctrlstudio.tech/api/v1/donations/${donationId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    collected: updatedCollected
                })
            })
                .then((response) => response.json())
                .then(() => {
                    fetchDonations(); // Re-fetch donations after submission
                    setEditingDonationId(null); // Close input field
                    setDonationAmount(""); // Reset donation amount
                    setIsSubmitting(false); // Reset submitting state
                })
                .catch((error) => {
                    console.error("Ошибка обновления пожертвования:", error);
                    setIsSubmitting(false); // Reset submitting state in case of error
                });
        } else {
            alert("Введите сумму пожертвования не менее 100 рублей.");
        }
    };

    return (
        <Layout
            header={<h1 className="text-3xl font-bold text-white mb-6">Помощь ветеранам</h1>}
            content={
                <div className="max-w-12xl mx-auto pt-35">
                    <button
                        className="bg-[rgba(233,81,0,0.8)] hover:bg-[#E95100] ml-1 text-white py-2 px-6 rounded mb-5"
                        onClick={handleCreateEvent}
                    >
                        Создать пожертвование
                    </button>

                    {donations === null ? (
                        <p>Загрузка данных о пожертвованиях...</p>
                    ) : donations.length === 0 ? (
                        <p>Нет доступных пожертвований.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {donations.map((donation) => {
                                const progressPercentage = Math.min(
                                    (donation.collected / donation.target) * 100,
                                    100
                                );

                                const age = donation.veteran.birth_date ? calculateAge(donation.veteran.birth_date) : "Не указано";

                                return (
                                    <div key={donation.id}
                                         className="relative bg-gray-700 p-6 rounded-lg shadow-md text-white">
                                        <h2 className="text-xl font-semibold mb-2">
                                            Пожертвование для
                                            ветерана {donation.veteran.first_name} {donation.veteran.last_name}
                                        </h2>
                                        <div className="mb-2">
                                            <p className="font-medium">Цель:</p>
                                            <p>{donation.purpose}</p>
                                        </div>
                                        <div className="mb-2">
                                            <p className="font-medium">Ветеран:</p>
                                            <p>{donation.veteran.first_name} {donation.veteran.last_name} {donation.veteran.patronymic}</p>
                                            <p className="text-sm text-gray-400">Возраст: {age} лет</p>
                                        </div>
                                        <div className="mb-4">
                                            <p className="font-medium">Биография:</p>
                                            <p>{donation.veteran.biography}</p>
                                        </div>

                                        <div className="mb-6 pb-6">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>Собрано: {donation.collected} руб</span>
                                                <span>Цель: {donation.target} руб</span>
                                            </div>
                                            <div className="w-full bg-gray-600 rounded-full h-2.5">
                                                <div
                                                    className="bg-orange-600 h-2.5 rounded-full"
                                                    style={{ width: `${progressPercentage}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-5 right-4 flex items-center space-x-2">
                                            {/* Show the input field and button side by side */}
                                            {editingDonationId === donation.id ? (
                                                <>
                                                    <input
                                                        type="number"
                                                        className="w-24 p-2 border border-gray-300 rounded"
                                                        placeholder="Сумма"
                                                        value={donationAmount}
                                                        onChange={handleDonationAmountChange}
                                                    />
                                                    <button
                                                        className={`bg-orange-600 hover:bg-orange-500 text-white py-2 px-6 rounded transition-colors ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                                                        onClick={() => handleDonationSubmit(donation.id)}
                                                        disabled={isSubmitting} // Disable button while submitting
                                                    >
                                                        Подтвердить
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    className="bg-orange-600 hover:bg-orange-500 text-white py-2 px-6 rounded transition-colors"
                                                    onClick={() => handleSupportClick(donation.id, donation.collected)}
                                                >
                                                    Поддержать
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            }
        />
    );
};

export default HelpPage;
