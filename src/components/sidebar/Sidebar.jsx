import React, { useContext, useEffect, useRef } from "react";
import "./Sidebar.scss";
import Logo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/profile-img.svg";
import { Link } from "react-router-dom";
import {
  BatteryFull,
  Candle,
  Category2,
  Document,
  LogoutCurve,
  MouseSquare,
  Profile2User,
  Reserve,
  ShoppingCart,
  Truck,
  UserSquare,
} from "iconsax-react";
import { sidebarContext } from "../../contexts/SidebarContext";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useContext(sidebarContext);
  const navbarRef = useRef(null);

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className != "sidebar-open-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-logo">
          <img src={Logo} />
        </div>
        <span className="sidebar-logo-text">Square</span>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <h6 className="sidebar-header">Menu</h6>
          <ul className="sidebar-menu-list">
            <li className="menu-item">
              <Link to={`/`} className="menu-item-icon">
                <Category2 size="14" />
                <span>Dashboard</span>
              </Link>
              <span className="notif">4</span>
            </li>
            <li className="menu-item">
              <Link to={`/`} className="menu-item-icon">
                <BatteryFull size="14" />
                <span>Stock</span>
              </Link>
            </li>
            <li className="menu-item active">
              <Link to={`/`} className="menu-item-icon">
                <Profile2User size="14" />
                <span>Customer</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to={`/`} className="menu-item-icon">
                <Reserve size="14" />
                <span>Restaurant</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to={`/`} className="menu-item-icon">
                <MouseSquare size="14" />
                <span>Design</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to={`/`} className="menu-item-icon">
                <Document size="14" />
                <span>Report</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to={`/`} className="menu-item-icon">
                <UserSquare size="14" />
                <span>Role & Admin</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to={`/`} className="menu-item-icon">
                <Candle size="14" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
          <h6 className="sidebar-header">Integration</h6>
          <ul className="sidebar-menu-list">
            <li className="menu-item">
              <Link to={`/`} className="menu-item-icon">
                <ShoppingCart size="14" />
                <span>Stock</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to={`/`} className="menu-item-icon">
                <Truck size="14" />
                <span>Supply</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu-bottom">
          <div className="sidebar-profile-user">
            <div>
              <img src={avatar} className="circle-img" />
            </div>
            <div className="sidebar-profile-body">
              <h4 className="sidebar-profile-user-name">Savannah N</h4>
              <p className="sidebar-profile-user-role">Food Quality Manager</p>
            </div>
          </div>
          <button className="btn w-full btn-danger">
            <LogoutCurve size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
