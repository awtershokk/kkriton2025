import Layout from "../../layouts/DefaultLayout.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateEventPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        start_time: '',
        end_time: '',
        location: '',
        purpose: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Функция для преобразования datetime-local в RFC3339 формат
    const toRFC3339 = (datetimeLocal: string) => {
        const date = new Date(datetimeLocal);
        return date.toISOString();
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

            // Преобразуем даты в RFC3339 формат
            const eventData = {
                ...formData,
                start_time: toRFC3339(formData.start_time),
                end_time: toRFC3339(formData.end_time),
                [userType === 'nko' ? 'nko_id' : 'volunteer_id']: parseInt(userId)
            };

            const response = await fetch('https://api.ctrlstudio.tech/api/v1/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Не удалось создать мероприятие');
            }

            navigate('/events');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Произошла неизвестная ошибка');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout
            header={<h1 className="text-3xl font-bold text-white mb-6">Создание мероприятия</h1>}
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
                                <label htmlFor="name" className="block mb-1 font-medium">Название</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-gray-600 border border-gray-500 rounded p-2"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="start_time" className="block mb-1 font-medium">Начало</label>
                                    <input
                                        type="datetime-local"
                                        id="start_time"
                                        name="start_time"
                                        value={formData.start_time}
                                        onChange={handleChange}
                                        className="w-full bg-gray-600 border border-gray-500 rounded p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="end_time" className="block mb-1 font-medium">Окончание</label>
                                    <input
                                        type="datetime-local"
                                        id="end_time"
                                        name="end_time"
                                        value={formData.end_time}
                                        onChange={handleChange}
                                        className="w-full bg-gray-600 border border-gray-500 rounded p-2"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="location" className="block mb-1 font-medium">Место проведения</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
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
                            <div>
                                <label htmlFor="description" className="block mb-1 font-medium">Описание</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full bg-gray-600 border border-gray-500 rounded p-2"
                                    rows={4}
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
                                    onClick={() => navigate('/events')}
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

export default CreateEventPage;