import React, { useContext } from "react";
import { sidebarContext } from "../contexts/SidebarContext";
import { HambergerMenu } from "iconsax-react";

const HamburgerMenu = () => {
  const { openSidebar } = useContext(sidebarContext);

  return (
    <div className="hamburger-menu">
      <HambergerMenu size="32" onClick={openSidebar} />
    </div>
  );
};

export default HamburgerMenu;
