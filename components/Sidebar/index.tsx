import useJobApplicationModal from "@/hooks/useJobApplicationModal";
import React from "react";
import { AiOutlineHome, AiOutlinePlus, AiOutlineUser } from "react-icons/ai";
import { BsCardChecklist } from "react-icons/bs";
import ThemeSwitch from "./ThemeSwitch";
import LogoutButton from "./LogoutButton";
import SidebarLink from "./SidebarLink";

type SidebarProps = {
  children: React.ReactNode | any;
};

const links = [
  { href: "/", icon: AiOutlineHome },
  { href: "/jobs", icon: BsCardChecklist },
  { href: "/profile", icon: AiOutlineUser },
];

const Sidebar = ({ children }: SidebarProps) => {
  const jobApplicationModal = useJobApplicationModal();
  return (
    <div className="flex">
      <div className="fixed w-20 h-screen p-4 bg-white dark:bg-zinc-900 border-r-[1px] border-gray-300 dark:border-zinc-700 flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <div
            onClick={() => jobApplicationModal.onOpen()}
            className="text-white  dark:text-black bg-[#392061] dark:bg-[#DDC9B4] hover:bg-gray-300 dark:hover:bg-[#D3B99C] cursor-pointer my-3 p-3 rounded-lg inline-block"
          >
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
          <ThemeSwitch />
          <LogoutButton />
        </div>
      </div>
      <main className="ml-20 w-full">{children}</main>
    </div>
  );
};

export default Sidebar;
