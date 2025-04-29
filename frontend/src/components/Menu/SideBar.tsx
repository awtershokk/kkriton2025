import {FaHome, FaHandsHelping, FaRobot, FaRegUser} from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { RiCustomerService2Line } from "react-icons/ri";

const SidebarMenu = () => {
    const currentPath = window.location.pathname;

    const menuItems = [
        { label: "Мой профиль", icon: <FaRegUser />, link: "/profile", group: "Мой профиль" },
        { label: "О нас", icon: <IoMdInformationCircleOutline />, link: "/about", group: "Основные" },
        { label: "Помощь", icon: <FaHandsHelping />, link: "/help", group: "Основные" },
        { label: "Мероприятия", icon: <FaHandsHelping />, link: "/events", group: "Основные" },
        { label: "ИИ Ассистент", icon: <FaRobot />, link: "/assistant", group: "Основные", beta: true },
        { label: "Поддержка", icon: <RiCustomerService2Line />, link: "/", group: "Основные2", disabled: true },
    ];

    const groupedItems = menuItems.reduce((acc, item) => {
        acc[item.group] = acc[item.group] || [];
        acc[item.group].push(item);
        return acc;
    }, {});

    const groupKeys = Object.keys(groupedItems);

    const handleClick = (event, item) => {
        if (item.disabled || currentPath === item.link) {
            event.preventDefault();
        }
    };

    return (
        <div className="min-h-[80vh] w-60 bg-[rgba(233,81,0,0.1)] border-l-4 border-[#E95100] rounded-l-[12px] text-[#E95100] flex flex-col shadow-md py-3">
            <div className="px-6 py-4 mb-2">
                <h2 className="text-xl font-bold text-white">Платформа для помощи ветеранам и семьям военнослужащих
                </h2>
            </div>

            {groupKeys.map((group, index) => (
                <div key={group}>
                    <ul className="flex flex-col">
                        {groupedItems[group].map((item) => (
                            <li key={item.label} className="flex items-center w-full">
                                <a
                                    href={item.link}
                                    onClick={(event) => handleClick(event, item)}
                                    target={item.openInNewTab ? "_blank" : "_self"}
                                    className={`flex items-center w-full py-2 px-6 text-white hover:bg-[rgba(233,81,0,0.2)] transition-colors duration-200 ${
                                        currentPath === item.link ? "bg-[rgba(233,81,0,0.3)] font-medium" : ""
                                    } ${item.disabled ? "text-[rgba(233,81,0,0.5)] cursor-not-allowed" : ""}`}
                                    style={item.disabled ? { pointerEvents: "none" } : {}}
                                >
                                    <span className="text-xl mr-3">{item.icon}</span>
                                    <span className="flex-1">{item.label}</span>
                                    {item.beta && (
                                        <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">
                                            Beta
                                        </span>
                                    )}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {index < groupKeys.length - 1 && (
                        <hr className="mx-6 my-2 border-[rgba(233,81,0,0.3)] w-auto max-w-[calc(100%-2rem)]" />
                    )}
                </div>
            ))}

            <div className="mt-auto px-6 py-4">
                <button className="w-full bg-[rgba(233,81,0,0.8)] text-white hover:bg-[#E95100] py-2 rounded transition-all">
                    Поддержать проект
                </button>
            </div>
        </div>
    );
};

export default SidebarMenu;