import { HomeIcon, InfoIcon, CreditCardIcon, MailIcon } from "@primer/octicons-react";
import Link from "next/link";
import { ActiveLink } from "../active-link/ActiveLink";

const navbarLinks = [
  { path: "/about", text: "About", icon: InfoIcon },
  { path: "/pricing", text: "Pricing", icon: CreditCardIcon },
  { path: "/contact", text: "Contact", icon: MailIcon },
];



export const Navbar = async () => {


  return (
    <nav className="flex bg-blue-800 bg-opacity-30 p-2 m-2 rounded">

      <Link href="/" className="mr-2 text-white flex items-center gap-2"><HomeIcon />Home</Link>

      <div className="flex flex-1"></div>



      {navbarLinks.map((navItem) => (
        <ActiveLink key={navItem.path} path={navItem.path}>
          <navItem.icon />
          {navItem.text}
        </ActiveLink>
      ))}






    </nav>

  );
};
