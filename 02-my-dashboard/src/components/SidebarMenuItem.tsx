"use client"

import { usePathname } from "next/navigation";

interface SidebarMenuItemProps {
    path: string;
    icon: React.ReactNode;
    title: string;
    description: string;
}

export default function SidebarMenuItem({ path, icon, title, description }: SidebarMenuItemProps) {

    const currentPath = usePathname();
    const isActive = currentPath === path;



    return (
        <a href={path} className={`w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 ${isActive ? "bg-blue-800" : "hover:bg-white/5"} transition ease-linear duration-150`}>
            <div>
                {icon}

            </div>
            <div className="flex flex-col">
                <span className="text-lg font-bold leading-5 text-white">{title}</span>
                <span className="text-sm text-white/50 hidden md:block">{description}</span>
            </div>
        </a>
    )
}
