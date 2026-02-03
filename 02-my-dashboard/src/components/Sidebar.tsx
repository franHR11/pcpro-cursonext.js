

import Image from "next/image";
import { IoBrowsersOutline, IoHeartOutline, IoLogOutOutline, IoLogoReact, IoPawOutline, IoPersonOutline, IoSettingsOutline } from "react-icons/io5";
import SidebarMenuItem from "./SidebarMenuItem";
import { IoMdCalculator } from "react-icons/io";


const sidebarMenuItems = [
    { path: "/dashboard/main", icon: <IoBrowsersOutline className="w-6 h-6" />, title: "Dashboard", description: "Data Overview" },
    { path: "/dashboard/counter", icon: <IoMdCalculator className="w-6 h-6" />, title: "Counter", description: "Estado Global" },
    { path: "/dashboard/pokemons", icon: <IoPawOutline className="w-6 h-6" />, title: "Pokemons", description: "Pokemons Estaticos" },
    { path: "/dashboard/favorites", icon: <IoHeartOutline className="w-6 h-6" />, title: "Favoritos", description: "Favoritos" },
    { path: "/dashboard/settings", icon: <IoSettingsOutline className="w-6 h-6" />, title: "Settings", description: "Settings" },
    { path: "/dashboard/profile", icon: <IoPersonOutline className="w-6 h-6" />, title: "Profile", description: "Profile" },
    { path: "/dashboard/logout", icon: <IoLogOutOutline className="w-6 h-6" />, title: "Logout", description: "Logout" },
]




export default function Sidebar() {
    return (

        <div id="menu"
            style={{ width: "400px" }}

            className="bg-gray-900 min-h-screen z-10 text-slate-300 w-64 left-0  overflow-y-scroll">
            <div id="logo" className="my-4 px-6">

                <h1 className="flex  items-center  text-lg md:text-2xl font-bold text-white">
                    <IoLogoReact className="mr-2" />
                    <span>Dash</span>
                    <span className="text-blue-500">8</span>.
                </h1>


                <p className="text-slate-500 text-sm">Manage your actions and activities</p>
            </div>
            <div id="profile" className="px-6 py-10">
                <p className="text-slate-500">Welcome back,</p>
                <a href="#" className="inline-flex space-x-2 items-center">
                    <span>
                        <Image className="rounded-full w-8 h-8" src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80" alt="imagen de perfil" width={32} height={32} />
                    </span>
                    <span className="text-sm md:text-base font-bold">
                        franHR
                    </span>
                </a>
            </div>




            <div id="nav" className="w-full px-6">


                {sidebarMenuItems.map((item) => (
                    <SidebarMenuItem key={item.path} path={item.path} icon={item.icon} title={item.title} description={item.description} />
                ))}




            </div>
        </div>
    )
}
