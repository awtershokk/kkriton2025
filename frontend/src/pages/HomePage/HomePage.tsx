import React from "react";
import backgroundImg from "../../assets/background/veterans.jpg";
import InfoBlock from "../../components/Blocks/InfoBlock.tsx";
import WideInfoBlock from "../../components/Blocks/WideInfoBlock.tsx";

import { FaHeart, FaBriefcase, FaShieldAlt, FaUserShield, FaHandsHelping } from "react-icons/fa";

const HomePage: React.FC = () => {
    return (
        <div
            className="h-screen w-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImg})` }}
        >
            <div className="flex justify-center items-center h-full px-[110px]">
                <div className="w-[50%] pr-[50px]">
                    <div className="w-[600px] mx-auto">
                        <h1 className="text-[46px] font-bold break-words">
                            Платформа для помощи ветеранам и семьям военнослужащих
                        </h1>
                        <h2 className="text-[23px] break-words mt-[10px]">
                            Платформа направлена на решение проблем в области медицины, юриспруденции и социальной помощи,
                            облегчая жизнь тем, кто отдал много ради нашей безопасности.
                        </h2>
                        <button
                            className="w-[300px] bg-[rgba(233,81,0,0.8)] text-[23px] hover:bg-[#E95100] py-2 mt-[20px] rounded"
                        >
                            Поддержать проект
                        </button>
                    </div>
                </div>

                <div className="w-[50%]">
                    <div className="grid grid-cols-2 gap-4">
                        <InfoBlock
                            icon={<FaHeart size={30} />}
                            title="Поддержка ветеранов"
                            description="Помогаем ветеранам адаптироваться к гражданской жизни."
                        />
                        <InfoBlock
                            icon={<FaBriefcase size={30} />}
                            title="Трудоустройство"
                            description="Предоставляем помощь в поиске работы и адаптации на новом месте."
                        />
                        <InfoBlock
                            icon={<FaShieldAlt size={30} />}
                            title="Юридическая помощь"
                            description="Предоставляем юридическую помощь ветеранам и их семьям."
                        />
                        <InfoBlock
                            icon={<FaUserShield size={30} />}
                            title="Медицинская помощь"
                            description="Обеспечиваем ветеранов медицинскими услугами и лечением."
                        />
                    </div>

                    <div className="mt-4">
                        <WideInfoBlock
                            icon={<FaHandsHelping size={40} />}
                            title="Комплексная поддержка"
                            description="Мы предоставляем полный спектр услуг для ветеранов и их семей, включая психологическую помощь, реабилитационные программы и социальную адаптацию."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;