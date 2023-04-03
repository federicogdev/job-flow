import { signOut } from "next-auth/react";
import React from "react";
import { BiLogOut } from "react-icons/bi";

interface Props {}

const LogoutButton = (props: Props) => {
  return (
    <div
      onClick={() => signOut()}
      className="bg-rose-600 text-gray-200 hover:opacity-80 cursor-pointer my-3 p-3 rounded-lg inline-block"
    >
      <BiLogOut size={20} />
    </div>
  );
};

export default LogoutButton;
