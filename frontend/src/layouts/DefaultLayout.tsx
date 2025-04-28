import { ReactNode } from "react";
import SidebarMenu from "../components/Menu/SideBar.tsx";

interface LayoutProps {
    children: ReactNode;
    header: ReactNode;
    content: ReactNode;
}

const Layout = ({ children, header, content }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-gray-900 flex">
            <div className="fixed left-10 top-1/2 transform -translate-y-1/2">
                <SidebarMenu />
            </div>
            <div className="fixed left-82 top-30 transform -translate-y-1/2">
                {header}
            </div>

            <main className="pl-80 pt-35 pr-10 w-full">
                <div className="bg-gray-800">
                    {content}
                </div>
            </main>
        </div>
    );
};

export default Layout;
