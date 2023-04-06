import { signOut } from "next-auth/react";
import React from "react";
import { BiLogOut } from "react-icons/bi";

const LogoutButton = () => {
  return (
    <div
      onClick={() => signOut()}
      className="text-white  dark:text-black bg-[#392061] dark:bg-[#DDC9B4] hover:bg-[#392061]/90 dark:hover:bg-[#DDC9B4]/90 cursor-pointer my-3 p-3 rounded-lg inline-block"
    >
      <BiLogOut size={16} />
    </div>
  );
};

export default LogoutButton;
