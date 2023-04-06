import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

type SidebarLinkProps = {
  href: string;
  //   label: string;
  icon: IconType;
};

const SidebarLink = ({ href, icon: Icon }: SidebarLinkProps) => {
  return (
    <Link href={href}>
      <div className="text-black dark:text-white bg-gray-200 dark:bg-zinc-700 border border-gray-200 dark:border-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-800 cursor-pointer my-3 p-3 rounded-lg inline-block">
        <Icon size={20} />
      </div>
    </Link>
  );
};

export default SidebarLink;
