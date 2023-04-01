import { signOut } from "next-auth/react";
import React from "react";
import { BiLogOut } from "react-icons/bi";

interface Props {}

const LogoutButton = (props: Props) => {
  return (
    <div
      onClick={() => signOut()}
      className="text-red-600 bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-800 cursor-pointer my-3 p-3 rounded-lg inline-block"
    >
      <BiLogOut size={20} />
    </div>
  );
};

export default LogoutButton;
