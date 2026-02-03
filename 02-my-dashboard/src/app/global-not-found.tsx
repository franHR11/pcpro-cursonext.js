// Import global styles and fonts
import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Sidebar } from '../components'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.',
}

export default function GlobalNotFound() {
    return (

        <html lang="en" className={inter.className}>
            <body>

                <div className="bg-slate-100 overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">

                    <div className="flex">

                        <Sidebar />


                        <div className=" w-full text-slate-800">


                            <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
                                <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
                                <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
                                    Página no encontrada
                                </div>
                                <button className="mt-5">
                                    <Link
                                        className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
                                        href="/dashboard/main"

                                    >
                                        <span
                                            className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
                                        ></span>

                                        <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                                            Volver al inicio
                                        </span>
                                    </Link>
                                </button>
                            </main>


                        </div>
                    </div>
                </div>
            </body>
        </html>


    )
}