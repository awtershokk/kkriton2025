import React from "react";

interface InfoBlockProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ icon, title, description }) => {
    return (
        <div className="flex items-center bg-[rgba(233,81,0,0.8)] text-white p-4 rounded mb-4 h-[130px] w-full">
            <div className="mr-4">{icon}</div>
            <div className="overflow-hidden">
                <h3 className="text-[18px] font-bold truncate">{title}</h3>
                <p className="text-[16px] ">{description}</p>
            </div>
        </div>
    );
};

export default InfoBlock;