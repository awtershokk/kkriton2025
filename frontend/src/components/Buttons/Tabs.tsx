import React, { useState, useEffect, useRef } from 'react';

interface Tab {
    key: string;
    label: string;
}

interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    setActiveTab: (tabKey: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {
    const [borderPosition, setBorderPosition] = useState(0);
    const [borderWidth, setBorderWidth] = useState(0);

    const tabRefs = useRef<HTMLButtonElement[]>([]);

    useEffect(() => {
        const activeTabIndex = tabs.findIndex(tab => tab.key === activeTab);

        if (tabRefs.current[activeTabIndex]) {

            const tabElement = tabRefs.current[activeTabIndex];
            setBorderPosition(tabElement.offsetLeft);
            setBorderWidth(tabElement.offsetWidth);
        }
    }, [activeTab, tabs]);

    return (
        <div className="relative">
            <div className="inline-flex space-x-4 border-b border-gray-600">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        ref={(el) => tabRefs.current.push(el!)}
                        className={`py-2 px-4 text-center font-medium whitespace-nowrap ${
                            activeTab === tab.key ? 'text-white' : 'text-gray-500'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div
                className="absolute bottom-0 h-[2px] bg-[rgba(233,81,0,0.8)] transition-all duration-300"
                style={{
                    left: `${borderPosition}px`,
                    width: `${borderWidth}px`,
                }}
            />
        </div>
    );
};

export default Tabs;
