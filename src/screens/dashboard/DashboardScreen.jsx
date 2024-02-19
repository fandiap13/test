import {
  Add,
  ArrowRight,
  Edit2,
  Filter,
  HambergerMenu,
  LogoutCurve,
  Printer,
  Refresh,
  SearchNormal1,
  ShieldSearch,
  Trash,
} from "iconsax-react";
import React, { useContext } from "react";
import TopMenuIcon from "../../assets/images/top-menu-icon.png";
import { sidebarContext } from "../../contexts/SidebarContext";
import SortIcon from "../../components/icons/SortIcon";
import { Link } from "react-router-dom";

const DashboardScreen = () => {
  const { openSidebar } = useContext(sidebarContext);

  const tableData = [
    {
      customer_name: "Odis Rinehart",
      level: "Warga",
      fav_menu: "Chicken & Ribs Combo",
      total: "IDR 194,700",
    },
    {
      customer_name: "Kris Roher",
      level: "Warga",
      fav_menu: "Surf & Turf Gift Basket",
      total: "IDR 631,200",
    },
    {
      customer_name: "Serenity Fisher",
      level: "Juragan",
      fav_menu: "Fried Chicken Dinner",
      total: "IDR 1,040.920",
    },
    {
      customer_name: "Brooklyn Warren",
      level: "Sultan",
      fav_menu: "Surf & Turf Gift Basket",
      total: "IDR 730,500",
    },
    {
      customer_name: "Franco Delort",
      level: "Juragan",
      fav_menu: "Chicken & Ribs Combo",
      total: "IDR 96,000",
    },
    {
      customer_name: "Saul Geoghegan",
      level: "Juragan",
      fav_menu: "Surf & Turf Gift Basket",
      total: "IDR 256,000",
    },
    {
      customer_name: "Alfredo Vetrovs",
      level: "Juragan",
      fav_menu: "Dark & Stormy",
      total: "IDR 590,080",
    },
    {
      customer_name: "Cristofer Vetrovs",
      level: "Konglomerat",
      fav_menu: "Shaking Beef Tri-Tip",
      total: "IDR 782,600",
    },
    {
      customer_name: "Calvin Steward",
      level: "Konglomerat",
      fav_menu: "BBQ Rib Dinner",
      total: "IDR 467,500",
    },
    {
      customer_name: "Calvin Steward",
      level: "Konglomerat",
      fav_menu: "BBQ Rib Dinner",
      total: "IDR 467,500",
    },
  ];

  return (
    <div className="content-area">
      <div className="content-area-top">
        <div className="hamburger-menu">
          <HambergerMenu size="32" onClick={openSidebar} />
        </div>

        <div className="area-top-heading">
          <h1 className="heading">Customer</h1>
        </div>
        <div className="area-top-body">
          <div className="switch-menu">
            <p>
              You can manage and organize your customer and other things here
            </p>
            <div className="menu-list">
              <button className="menu-list-button active">Customer</button>
              <button className="menu-list-button">Promo</button>
              <button className="menu-list-button">Voucer</button>
            </div>
          </div>
        </div>
      </div>

      <div className="content-main">
        <div className="content-search">
          <h2 className="content-search-heading">Customer</h2>
          <p>
            On this menu you will be able to create, edit, and also delete the
            customer. Also you can manage it easily.
          </p>
          <div className="content-search-tools">
            <button className="btn btn-search-tools grid-area-button1">
              <Add size={18} />
              Add New Customer
            </button>
            <button className="btn btn-search-tools grid-area-button2">
              <Filter size={18} />
              Filter
            </button>
            <form className="content-search-form grid-area-search">
              <SearchNormal1 size={18} />
              <input placeholder="Search Customer" />
              <button className="btn btn-search-form">Search</button>
            </form>
            <button className="btn btn-search-tools grid-area-button3">
              <Refresh size={18} />
              Refresh
            </button>
            <button className="btn btn-search-tools grid-area-button4">
              <Printer size={18} />
            </button>
          </div>
        </div>

        <div className="content-analytic">
          <p>See analytics of the Customer Clearly</p>
          <button className="btn btn-search-tools">See Analytics</button>
        </div>

        <div className="content-top-menu">
          <div className="content-top-l">
            <h1 className="content-top-menu-header">
              Top Menu <span>This Week</span>
            </h1>

            <p>10 - 12 Agustus 2023</p>

            <div className="content-top-menu-card">
              Nasi Goreng Jamur Special Resto Pak Min
              <img src={TopMenuIcon} className="top-menu-icon" />
            </div>

            <ol className="list-top-menu">
              <li>Tongseng Sapi Gurih</li>
              <li>Nasi Gudek Telur Ceker</li>
              <li>Nasi Ayam Serundeng</li>
              <li>Nasi Goreng Seafood</li>
            </ol>
          </div>

          <div className="graphic-img"></div>
        </div>

        <div className="my-table">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <div className="th-content">
                    <span>Customer Name</span> <SortIcon />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Level</span> <SortIcon />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Favorite Menu</span> <SortIcon />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Total Transaction</span> <SortIcon />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    <span>Action</span> <SortIcon />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data, index) => (
                <tr key={index}>
                  <td>{data.customer_name}</td>
                  <td>
                    <div
                      className={`bg-label ${
                        data.level === "Konglomerat"
                          ? "purple"
                          : data.level === "Sultan"
                          ? "success"
                          : data.level === "Juragan"
                          ? "primary"
                          : "warning"
                      }`}
                    >
                      <span
                        className={`label-${
                          data.level === "Konglomerat"
                            ? "purple"
                            : data.level === "Sultan"
                            ? "success"
                            : data.level === "Juragan"
                            ? "primary"
                            : "warning"
                        }`}
                      >
                        {data.level}
                      </span>
                    </div>
                  </td>
                  <td>{data.fav_menu}</td>
                  <td>{data.total}</td>
                  <td>
                    <div className="action-table">
                      <button className="btn btn-sm btn-default">
                        <ShieldSearch size={12} />
                        <span>Logout</span>
                      </button>
                      <button className="btn btn-sm btn-default">
                        <Edit2 size={12} />
                      </button>
                      <button className="btn btn-sm btn-danger">
                        <Trash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="page-navigation">
            <p>Showing 10 Data Customers</p>
            <ul className="pagination">
              <li className="page-item active">
                <Link to={`/`}>1</Link>
              </li>
              <li className="page-item">
                <Link to={`/`}>2</Link>
              </li>
              <li className="page-item">
                <Link to={`/`}>3</Link>
              </li>
              <li className="page-item">
                <Link to={`/`}>...</Link>
              </li>
              <li className="page-item">
                <Link to={`/`}>38</Link>
              </li>
              <li className="page-item">
                <Link to={`/`}>
                  Next <ArrowRight size="16" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
