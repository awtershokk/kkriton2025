import React, { useState, useEffect } from "react";
import Layout from "../../layouts/DefaultLayout.tsx";
import { useNavigate } from "react-router-dom";

const CreateDonationPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        veteran_id: '',
        target: '',
        purpose: '',
    });
    const [veterans, setVeterans] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Получаем список ветеранов
        fetch("https://api.ctrlstudio.tech/api/v1/veteran")
            .then((response) => response.json())
            .then((data) => {
                if (data === null || data.length === 0) {
                    setError("Ветераны не найдены.");
                } else {
                    setVeterans(data); // Сохраняем список ветеранов
                }
            })
            .catch((error) => {
                setError("Ошибка при получении данных о ветеранах.");
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const userId = localStorage.getItem('userId');
            const userType = localStorage.getItem('userType');

            if (!userId || !userType) {
                navigate('/login');
                return;
            }

            const donationData = {
                ...formData,
                veteran_id: parseInt(formData.veteran_id),  // Преобразуем в число
                target: parseFloat(formData.target),       // Преобразуем в число
                purpose: formData.purpose,
                [userType === 'nko' ? 'nko_id' : 'volunteer_id']: parseInt(userId),
            };

            const response = await fetch('https://api.ctrlstudio.tech/api/v1/donations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(donationData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Не удалось создать пожертвование');
            }

            navigate('/donations');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Произошла неизвестная ошибка');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout
            header={<h1 className="text-3xl font-bold text-white mb-6">Создание пожертвования</h1>}
            content={
                <div className="max-w-12xl pt-35 mx-auto">
                    <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                        <form onSubmit={handleSubmit} className="space-y-4 text-white">
                            {error && (
                                <div className="bg-red-600 p-3 rounded text-white">
                                    {error}
                                </div>
                            )}
                            <div>
                                <label htmlFor="veteran_id" className="block mb-1 font-medium">Выберите ветерана</label>
                                <select
                                    id="veteran_id"
                                    name="veteran_id"
                                    value={formData.veteran_id}
                                    onChange={handleChange}
                                    className="w-full bg-gray-600 border border-gray-500 rounded p-2"
                                    required
                                >
                                    <option value="">Выберите ветерана</option>
                                    {veterans.map((veteran) => (
                                        <option key={veteran.id} value={veteran.id}>
                                            {veteran.first_name} {veteran.last_name} {veteran.patronymic}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="target" className="block mb-1 font-medium">Необходимая сумма</label>
                                <input
                                    type="number"
                                    id="target"
                                    name="target"
                                    value={formData.target}
                                    onChange={handleChange}
                                    className="w-full bg-gray-600 border border-gray-500 rounded p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="purpose" className="block mb-1 font-medium">Цель мероприятия</label>
                                <input
                                    type="text"
                                    id="purpose"
                                    name="purpose"
                                    value={formData.purpose}
                                    onChange={handleChange}
                                    className="w-full bg-gray-600 border border-gray-500 rounded p-2"
                                    required
                                />
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="bg-[rgba(233,81,0,0.8)] hover:bg-[#E95100] text-white py-2 px-6 rounded"
                                    disabled={loading}
                                >
                                    {loading ? 'Создание...' : 'Создать'}
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-6 rounded"
                                    onClick={() => navigate('/help')}
                                >
                                    Отмена
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        />
    );
};

export default CreateDonationPage;
