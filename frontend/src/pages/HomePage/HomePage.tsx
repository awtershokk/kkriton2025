import React from "react";
import backgroundImg from "../../assets/background/veterans.jpg";

const HomePage: React.FC = () => {
    return (
        <div
            className="h-screen w-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImg})` }}
        >
            <div className="flex flex-col justify-center h-full px-[110px]">
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
        </div>
    );
};

export default HomePage;
