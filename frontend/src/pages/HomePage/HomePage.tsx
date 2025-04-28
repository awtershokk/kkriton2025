import React from "react";
import backgroundImg from "../../assets/background /veterans.jpg";

const HomePage: React.FC = () => {
    return (
        <div
            className="h-screen w-screen bg-cover bg-center bg-no-repeat"
            style={{backgroundImage: `url(${backgroundImg})`}}
        >
            <div className="p-[150px] h-calc(100%-200px)] w-[calc(100%-200px)] flex items-center justify-center">
                <div className="w-[600px]">
                    <h1 className="text-[42px] font-bold break-words">
                        Платформа для помощи ветеранам и семьям военнослужащих
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default HomePage;