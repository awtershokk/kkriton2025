import { ReactNode } from "react";
import SidebarMenu from "../components/Menu/SideBar.tsx";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-gray-900 flex">
            <div className="fixed left-5 top-5 bottom-5">
                <SidebarMenu />
            </div>
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;