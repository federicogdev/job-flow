import { useRouter } from "next/router";
import React from "react";
import Sidebar from "../Sidebar";
interface Props {
  children: React.ReactNode | any;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const showSidebar = router.pathname === "/auth" ? false : true;

  return <>{showSidebar ? <Sidebar>{children}</Sidebar> : children}</>;
};

export default Layout;
