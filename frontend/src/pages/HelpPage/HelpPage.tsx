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

    useEffect(() => {
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
    }, []);

    const handleSupportClick = (donationId: number) => {
        navigate(`/donate/${donationId}`);
    };

    // Функция для вычисления возраста на основе даты рождения
    const calculateAge = (birthDate: string) => {
        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDifference = today.getMonth() - birth.getMonth();

        // Если день рождения еще не был в этом году, уменьшаем возраст на 1
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    };

    const handleCreateEvent = () => {
        navigate('/help/create');
    };

    return (
        <Layout
            header={<h1 className="text-3xl font-bold text-white mb-6">Помощь ветеранам</h1>}
            content={
                <div className="max-w-12xl mx-auto pt-35">
                    {/* Кнопка "Создать пожертвование" над всем */}
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

                                        <div className="absolute bottom-5 right-4">
                                            <button
                                                className="bg-orange-600 hover:bg-orange-500 text-white py-2 px-6 rounded transition-colors"
                                                onClick={() => handleSupportClick(donation.id)}
                                            >
                                                Поддержать
                                            </button>
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
