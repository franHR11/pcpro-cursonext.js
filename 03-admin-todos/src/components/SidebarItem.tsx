"use client"

import React from 'react'
import { usePathname } from 'next/navigation'



interface SidebarItemProps {
    path: string;
    icon: React.ReactNode;
    title: string;
}


export const SidebarItem = ({ path, icon, title }: SidebarItemProps) => {
    const currentPath = usePathname();
    const isActive = currentPath === path;
    const activeClassName = isActive ? "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400" : "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group";
    const inactiveClassName = isActive ? "text-white" : "text-gray-600 group";
    return (
        <li className="hover:bg-sky-600 group transition duration-300 rounded-md mb-2">
            <a href={path} className={`${activeClassName} flex items-center p-2`}>
                {/* El icono y el texto heredarán el color blanco si usas group-hover o simplemente hover en el padre */}
                <span className="group-hover:text-white transition duration-300">
                    {icon}
                </span>
                <span className={`${inactiveClassName} group-hover:text-white transition duration-300 ml-2`}>
                    {title}
                </span>
            </a>
        </li>
    )
}
