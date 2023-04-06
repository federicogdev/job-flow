import useJobApplicationModal from "@/hooks/useJobApplicationModal";
import React from "react";

import { AiOutlineHome, AiOutlinePlus, AiOutlineUser } from "react-icons/ai";
import { BsCardChecklist } from "react-icons/bs";
import LogoutButton from "./LogoutButton";
import SidebarLink from "./SidebarLink";
import ThemeSwitch from "./ThemeSwitch";

type SidebarProps = {
  children: React.ReactNode | any;
};

const links = [
  { href: "/", icon: AiOutlineHome },
  { href: "/jobs", icon: BsCardChecklist },
];

const Sidebar = ({ children }: SidebarProps) => {
  const jobApplicationModal = useJobApplicationModal();

  return (
    <div className="flex">
      <div className="fixed w-16 h-screen p-2 bg-gray-100 dark:bg-zinc-900 border-r border-gray-300 dark:border-zinc-800 flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <div
            onClick={() => jobApplicationModal.onOpen()}
            className="text-white  dark:text-black bg-[#392061] dark:bg-[#DDC9B4] hover:bg-[#392061]/90 dark:hover:bg-[#DDC9B4]/90 cursor-pointer my-3 p-3 rounded-lg inline-block"
          >
            <AiOutlinePlus size={16} />
          </div>

          <span className="border-b border-gray-300 dark:border-zinc-800 w-full p-2" />
          <>
            {links.map((link, i) => (
              <SidebarLink href={link.href} icon={link.icon} key={i} />
            ))}
          </>
        </div>

        <div className="flex flex-col items-center">
          <ThemeSwitch />
          <LogoutButton />
        </div>
      </div>
      <div className="ml-16 w-full">{children}</div>
    </div>
  );
};

export default Sidebar;
