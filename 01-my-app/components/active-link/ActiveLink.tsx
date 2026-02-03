"use client"

import Link from "next/link";
import styles from "./ActiveLink.module.css";
import { usePathname } from "next/navigation";

interface ActiveLinkProps {
    path: string;
    children: React.ReactNode;
}


export const ActiveLink = ({ path, children }: ActiveLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === path;

    return (
        <Link href={path} className={isActive ? `${styles.link} ${styles["active-link"]}` : styles.link}>
            {children}
        </Link>
    )
}
