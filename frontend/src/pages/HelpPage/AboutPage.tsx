import Layout from "../../layouts/DefaultLayout.tsx";
import {useNavigate} from "react-router-dom";


const AboutPage = () => {
    const navigate = useNavigate();

    const handleSupportClick = () => {
        navigate("/help");
    };

    return (
        <Layout
            header={
                <h1 className="text-3xl font-bold text-white mb-6">
                    Добро пожаловать на платформу помощи ветеранам и семьям военнослужащих
                </h1>
            }
            content={
                <div className="max-w-12xl mx-auto">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-white mb-4">О нашей платформе</h2>
                        <p className="text-white mb-4">
                            Наша платформа объединяет волонтеров, некоммерческие организации и граждан для поддержки ветеранов, участников СВО и семей военнослужащих. Мы предлагаем удобный сервис для поиска помощи и участия в различных инициативах.
                        </p>
                        <p className="text-white mb-4">
                            На платформе можно зарегистрироваться в качестве волонтера или представителя НКО, найти поддержку в различных сферах: медицинская помощь, питание, юридическая поддержка и многое другое. Также доступны разделы для создания и участия в мероприятиях, направленных на помощь ветеранам и их семьям.
                        </p>
                        <p className="text-white mb-4">
                            Так же нами был разработан ИИ-Ассистент, который помогает пользователям быстро находить нужную информацию, получать ответы на вопросы и ориентироваться в доступных возможностях помощи.
                        </p>
                        <button
                            className="w-[380px] bg-[rgba(233,81,0,0.8)] text-xl hover:bg-[#E95100] py-2  rounded"
                            onClick={handleSupportClick}
                        >
                            Присоединиться к помощи ветеранам
                        </button>
                    </div>
                </div>
            }
        />
    );
};

export default AboutPage;
