import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineLineChart } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import ThemeSwitch from "../ThemeSwitch";
import { signOut } from "next-auth/react";

interface SidebarProps {
  children: React.ReactNode | any;
}

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div className="flex">
      <div className="fixed w-20 h-screen p-4 bg-white dark:bg-zinc-900 border-r-[1px] border-gray-300 dark:border-zinc-700 flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <Link href="/add">
            <div className="bg-orange-500 dark:bg-orange-500 hover:bg-gray-300 dark:hover:bg-zinc-800 rounded-lg inline-block p-3">
              <MdAdd size={20} />
            </div>
          </Link>
          <span className="border-b-[1px] border-gray-300 dark:border-zinc-700 w-full p-2" />
          <Link href="/">
            <div className="bg-gray-100 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-800 cursor-pointer my-3 p-3 rounded-lg inline-block">
              <AiOutlineLineChart size={20} />
            </div>
          </Link>

          <Link href="/">
            <div className="bg-gray-100 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-800 cursor-pointer my-3 p-3 rounded-lg inline-block">
              <AiOutlineHome size={20} />
            </div>
          </Link>

          <Link href="/">
            <div className="bg-gray-100 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-800 cursor-pointer my-3 p-3 rounded-lg inline-block">
              <IoPersonOutline size={20} />
            </div>
          </Link>
        </div>

        <div
          className="bg-red-500 hover:bg-red-700 cursor-pointer my-3 p-3 rounded-lg inline-block"
          onClick={() => signOut()}
        >
          <BiLogOut size={20} />
        </div>
        <ThemeSwitch />
      </div>
      <main className="ml-20 w-full">{children}</main>
    </div>
  );
};

export default Sidebar;
