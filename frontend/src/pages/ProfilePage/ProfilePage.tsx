import Layout from "../../layouts/DefaultLayout.tsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type VolunteerProfile = {
    TotalEvents: number;
    CompletedEvents: number;
    id: number;
    full_name: string;
    email: string;
    phone: string;
};

type NkoProfile = {
    id: number;
    name: string;
    email: string;
    phone: string;
    description: string;
    website?: string;
    TotalEvents: number;
    CompletedEvents: number;
};

const ProfilePage = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<VolunteerProfile | NkoProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userType, setUserType] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const userType = localStorage.getItem('userType');

                if (!userId || !userType) {
                    navigate('/login');
                    return;
                }

                setUserType(userType);

                if (userType === 'volunteer') {
                    const response = await fetch(`http://89.169.0.160:8080/api/v1/volunteers/${userId}`);
                    if (!response.ok) {
                        throw new Error('Не удалось загрузить профиль волонтера');
                    }
                    const data = await response.json();
                    setProfile(data);
                } else if (userType === 'nko') {
                    const response = await fetch(`http://89.169.0.160:8080/api/v1/nko/${userId}`);
                    if (!response.ok) {
                        throw new Error('Не удалось загрузить профиль НКО');
                    }
                    const data = await response.json();
                    setProfile(data);
                }

            } catch (err) {
                setError(err instanceof Error ? err.message : 'Произошла неизвестная ошибка');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleEditProfile = () => {
    };

    if (loading) {
        return (
            <Layout
                header={<h1 className="text-3xl font-bold text-white mb-6">Загрузка профиля...</h1>}
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
                <h1 className="text-3xl font-bold text-white mb-6">
                    Мой профиль
                </h1>
            }
            content={
                <div className="max-w-12xl pt-35 mx-auto">
                    <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                        {profile && (
                            <>
                                <div className="mb-6">
                                    <h2 className="text-2xl font-semibold text-white mb-4">Основная информация</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
                                        {userType === 'volunteer' ? (
                                            <>
                                                <div>
                                                    <p className="font-bold">ФИО:</p>
                                                    <p>{(profile as VolunteerProfile).full_name}</p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    <p className="font-bold">Название организации:</p>
                                                    <p>{(profile as NkoProfile).named}</p>
                                                </div>
                                                {(profile as NkoProfile).website && (
                                                    <div>
                                                        <p className="font-bold">Веб-сайт:</p>
                                                        <p>{(profile as NkoProfile).website}</p>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        <div>
                                            <p className="font-bold">Email:</p>
                                            <p>{profile.email}</p>
                                        </div>
                                        <div>
                                            <p className="font-bold">Телефон:</p>
                                            <p>{profile.phone}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h2 className="text-2xl font-semibold text-white mb-4">Статистика</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
                                        {userType === 'volunteer' ? (
                                            <>
                                                <div className="bg-gray-600 p-4 rounded">
                                                    <p className="font-medium">Всего мероприятий</p>
                                                    <p className="text-xl">{(profile as VolunteerProfile).TotalEvents}</p>
                                                </div>
                                                <div className="bg-gray-600 p-4 rounded">
                                                    <p className="font-medium">Завершенных мероприятий</p>
                                                    <p className="text-xl">{(profile as VolunteerProfile).CompletedEvents}</p>
                                                </div>
                                                <div className="bg-gray-600 p-4 rounded">
                                                    <p className="font-medium">Объявлений о помощи</p>
                                                    <p className="text-xl">4</p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="bg-gray-600 p-4 rounded">
                                                    <p className="font-medium">Всего мероприятий</p>
                                                    <p className="text-xl">{(profile as NkoProfile).TotalEvents}</p>
                                                </div>
                                                <div className="bg-gray-600 p-4 rounded">
                                                    <p className="font-medium">Активных мероприятий</p>
                                                    <p className="text-xl">{(profile as NkoProfile).CompletedEvents}</p>
                                                </div>
                                                <div className="bg-gray-600 p-4 rounded">
                                                    <p className="font-medium">Объявлений о помощи</p>
                                                    <p className="text-xl">42</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 mt-6">
                                    <button
                                        className="bg-[rgba(233,81,0,0.8)] hover:bg-[#E95100] text-white py-2 px-6 rounded"
                                        onClick={handleEditProfile}
                                    >
                                        Редактировать профиль
                                    </button>
                                    <button
                                        className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-6 rounded"
                                        onClick={() => navigate('/events')}
                                    >
                                        {userType === 'volunteer' ? 'Мои мероприятия' : 'Мои события'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            }
        />
    );
};

export default ProfilePage;