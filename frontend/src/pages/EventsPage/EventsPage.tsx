import Layout from "../../layouts/DefaultLayout.tsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

type Volunteer = {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    TotalEvents: number;
    CompletedEvents: number;
};

type NKO = {
    id: number;
    name: string;
    email?: string;
    phone?: string;
};

type Event = {
    id: number;
    name: string;
    start_time: string;
    end_time: string;
    location: string;
    purpose: string;
    description: string;
    nko_id?: number;
    volunteer_id?: number;
    volunteer?: Volunteer;
    nko?: NKO;
};

const EventsPage = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userType, setUserType] = useState<string | null>(null);
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const userType = localStorage.getItem('userType');
                setCurrentUserId(Number(userId));

                if (!userId || !userType) {
                    navigate('/login');
                    return;
                }

                setUserType(userType);

                const response = await fetch('https://api.ctrlstudio.tech/api/v1/events');

                if (!response.ok) {
                    throw new Error('Не удалось загрузить мероприятия');
                }

                const data = await response.json();
                setEvents(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Произошла неизвестная ошибка');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [navigate]);

    const handleCreateEvent = () => {
        navigate('/events/create');
    };

    const handleDeleteEvent = async (id: number) => {
        try {
            const response = await fetch(`https://api.ctrlstudio.tech/api/v1/events/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Не удалось удалить мероприятие');
            }

            setEvents(events.filter(event => event.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Произошла неизвестная ошибка');
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('ru-RU');
    };

    if (loading) {
        return (
            <Layout
                header={<h1 className="text-3xl font-bold text-white mb-6">Загрузка мероприятий...</h1>}
                content={<div className="text-white">Пожалуйста, подождите</div>}
            />
        );
    }

    if (error) {
        return (
            <Layout
                header={<h1 className="text-3xl font-bold text-white mb-6">Ошибка</h1>}
                content={
                    <div className="bg-gray-700 p-6 rounded-lg shadow-md text-white">
                        {error}
                    </div>
                }
            />
        );
    }

    return (
        <Layout
            header={
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white mb-6">Мероприятия</h1>
                </div>
            }
            content={
                <div className="max-w-12xl pt-35 mx-auto">
                    {userType && (
                        <button
                            className="bg-[rgba(233,81,0,0.8)] hover:bg-[#E95100] ml-1 text-white py-2 px-6 rounded mb-5"
                            onClick={handleCreateEvent}
                        >
                            Создать мероприятие
                        </button>
                    )}
                    {events.length === 0 ? (
                        <div className="ml-1 text-gray-400 text-[20px]">Нет мероприятий</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map((event) => (
                                <div key={event.id} className="relative bg-gray-700 p-6 rounded-lg shadow-md text-white">
                                    <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
                                    <div className="mb-2">
                                        <p className="font-medium">Дата и время:</p>
                                        <p>{formatDate(event.start_time)} - {formatDate(event.end_time)}</p>
                                    </div>
                                    <div className="mb-2">
                                        <p className="font-medium">Место:</p>
                                        <p>{event.location}</p>
                                    </div>
                                    <div className="mb-2">
                                        <p className="font-medium">Организатор:</p>
                                        {event.volunteer ? (
                                            <p>{event.volunteer.full_name}</p>
                                        ) : event.nko ? (
                                            <p>{event.nko.name}</p>
                                        ) : (
                                            <p>Неизвестен</p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <p className="font-medium">Цель:</p>
                                        <p>{event.purpose}</p>
                                    </div>

                                    {userType && currentUserId && (
                                        ((userType === 'volunteer' && event.volunteer_id === currentUserId) ||
                                            (userType === 'nko' && event.nko_id === currentUserId)) && (
                                                <div className="absolute bottom-6 right-6">
                                                    <button
                                                        title="Удалить"
                                                        onClick={() => handleDeleteEvent(event.id)}
                                                        className="text-red-500 hover:text-red-700 text-xl"
                                                    >
                                                        <FaTrash/>
                                                    </button>
                                                </div>

                                        )
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            }
        />
    );
};

export default EventsPage;
