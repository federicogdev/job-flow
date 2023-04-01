import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineLineChart } from "react-icons/ai";
import { AiOutlineUser, AiOutlinePlus } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { BsCardChecklist } from "react-icons/bs";
import ThemeSwitch from "../ThemeSwitch";
import { signOut } from "next-auth/react";
import SidebarLink from "./SidebarLink";
import LogoutButton from "./LogoutButton";

type SidebarProps = {
  children: React.ReactNode | any;
};

const links = [
  { href: "/", icon: AiOutlineHome },
  { href: "/posts", icon: BsCardChecklist },
  { href: "/profile", icon: AiOutlineUser },
];

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div className="flex">
      <div className="fixed w-20 h-screen p-4 bg-white dark:bg-zinc-900 border-r-[1px] border-gray-300 dark:border-zinc-700 flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <div className="text-black  dark:text-white bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-800 cursor-pointer my-3 p-3 rounded-lg inline-block">
            <AiOutlinePlus size={20} />
          </div>
          <span className="border-b-[1px] border-gray-300 dark:border-zinc-700 w-full p-2" />
          <>
            {links.map((link, i) => (
              <SidebarLink href={link.href} icon={link.icon} key={i} />
            ))}
          </>
        </div>

        <div>
          <LogoutButton />

          <ThemeSwitch />
        </div>
      </div>
      <main className="ml-20 w-full">{children}</main>
    </div>
  );
};

export default Sidebar;
