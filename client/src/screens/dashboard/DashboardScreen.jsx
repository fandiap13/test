import { Add, Filter, Printer, Refresh, SearchNormal1 } from "iconsax-react";
import React, { useState } from "react";
import TopMenuIcon from "../../assets/images/top-menu-icon.png";
import axios from "axios";
import TableComponent from "./components/TableComponent";
import { useNavigate } from "react-router-dom";
// modal
import { useDisclosure } from "@chakra-ui/react";
import HamburgerMenu from "../../components/HamburgerMenu";

const DashboardScreen = () => {
  const [customers, setCustomers] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchCustomer, setSearchCustomer] = useState("");
  const navigate = useNavigate();
  // modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function getCustomers(url = null) {
    try {
      setLoading(true);
      setCustomers({});
      var res;
      if (searchCustomer != "" && searchCustomer != null) {
        res = await axios.post(url == null ? "/api/customers" : url, {
          search: searchCustomer,
        });
      } else {
        res = await axios.get(url == null ? "/api/customers" : url);
      }
      setCustomers(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  useState(() => {
    getCustomers();
  }, []);

  return (
    <div className="content-area">
      <div className="content-area-top">
        <HamburgerMenu />

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

      <div className="content-main-dashboard">
        <div className="content-search">
          <h2 className="content-search-heading">Customer</h2>
          <p>
            On this menu you will be able to create, edit, and also delete the
            customer. Also you can manage it easily.
          </p>
          <div className="content-search-tools">
            <button
              className="btn btn-search-tools grid-area-button1"
              onClick={(e) => navigate("/add-customer")}
            >
              <Add size={18} />
              Add New Customer
            </button>
            <button className="btn btn-search-tools grid-area-button2">
              <Filter size={18} />
              Filter
            </button>
            <form className="content-search-form grid-area-search">
              <SearchNormal1 size={18} />
              <input
                placeholder="Search Customer"
                onChange={(e) => setSearchCustomer(e.target.value)}
              />
              <button
                className="btn btn-search-form"
                onClick={async (e) => {
                  e.preventDefault();
                  await getCustomers();
                }}
              >
                Search
              </button>
            </form>
            <button
              className="btn btn-search-tools grid-area-button3"
              onClick={async function (e) {
                e.preventDefault();
                await getCustomers();
              }}
            >
              <Refresh size={18} />
              Refresh
            </button>
            <button
              className="btn btn-search-tools grid-area-button4"
              onClick={onOpen}
            >
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

        <TableComponent
          customers={customers}
          loading={loading}
          refresh={getCustomers}
        />
      </div>
    </div>
  );
};

export default DashboardScreen;
