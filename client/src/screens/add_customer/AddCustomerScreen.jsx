import React, { useEffect, useState } from "react";
import HamburgerMenu from "../../components/HamburgerMenu";
import axios from "axios";
import { Back } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import ErrorsMessages from "../../components/ErrorsMessage";

const AddCustomerScreen = () => {
  const [level, setLevel] = useState([]);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    level_id: "",
    menu_id: "",
    quantity: 1,
    total_transaction: 0,
    price: 0,
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function formatRupiah(angka) {
    return angka.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  }

  async function getLevel() {
    try {
      const res = await axios.get("/api/level");
      setLevel(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function getMenu() {
    try {
      const res = await axios.get("/api/menu");
      setMenu(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  function handleMenuChange(e) {
    const selectedPrice = e.target.selectedOptions[0].getAttribute("price");
    const totalTransaksi = parseFloat(selectedPrice) * parseInt(form.quantity);
    setForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
      total_transaction: totalTransaksi,
      price: selectedPrice,
    }));
  }

  function handleQuantityChange(e) {
    let value = parseInt(e.target.value); // Parse nilai input sebagai angka
    if (value < 1 || isNaN(value) || e.target.value == "") {
      // Jika nilai input kurang dari 1 atau bukan angka, atur kembali ke 1
      return;
    }
    const totalTransaksi = parseFloat(form.price) * parseInt(e.target.value);
    setForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
      total_transaction: totalTransaksi,
    }));
  }

  function clearErrors() {
    setErrors([]);
  }

  function getErrorMsg(err) {
    let errMsg = [];
    clearErrors();
    err.forEach((element) => {
      //   setErrors((prev) => [...prev, element.msg]);
      errMsg.push(element.msg);
    });
    setErrors(errMsg);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      clearErrors();
      setLoading(true);
      const res = await axios.post("/api/add_customer", form);
      //   console.log(res.data);
      setLoading(false);
      navigate("/edit-customer/" + res.data.data.insertId);
    } catch (error) {
      console.log(error.response);
      getErrorMsg(error.response.data.errors);
      setLoading(false);
    }
  }

  useEffect(() => {
    getLevel();
    getMenu();
  }, []);

  return (
    <div className="content-area">
      <div className="content-area-top">
        <HamburgerMenu />

        <div className="area-top-heading">
          <button
            onClick={() => navigate("/dashboard")}
            className="btn btn-primary"
          >
            <Back size={20} />
          </button>
          <h1 className="heading">Add Customer</h1>
        </div>
      </div>

      <div className="content-main">
        <ErrorsMessages errors={errors} clearErrors={clearErrors} />

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="label-style">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              id="name"
              className="input-style"
              required
              onChange={handleChange}
              value={form.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="level_id" className="label-style">
              Level
            </label>
            <select
              id="level_id"
              className="input-style"
              disabled={level.length < 1}
              onChange={handleChange}
            >
              <option>-- pilih --</option>
              {level.map((data) => (
                <option
                  value={data.id}
                  key={data.id}
                  defaultValue={data.id == form.level_id}
                >
                  {data.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="menu_id" className="label-style">
              Favorite Menu
            </label>
            <select
              id="menu_id"
              className="input-style"
              disabled={menu.length < 1}
              onChange={handleMenuChange}
            >
              <option>-- pilih --</option>
              {menu.map((data) => (
                <option
                  value={data.id}
                  key={data.id}
                  price={data.price}
                  defaultValue={data.id == form.menu_id}
                >
                  {data.name} (IDR {formatRupiah(data.price)})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="quantity" className="label-style">
              Quantity
            </label>
            <input
              type="number"
              placeholder="Quantity"
              id="quantity"
              className="input-style"
              required
              onChange={handleQuantityChange}
              min={1}
              value={form.quantity}
            />
          </div>
          <div className="form-group">
            <label htmlFor="total_transaction" className="label-style">
              Total Transaction
            </label>
            <input
              type="number"
              placeholder="0"
              id="total_transaction"
              className="input-style"
              disabled={true}
              required
              value={form.total_transaction}
            />
          </div>
          <br />
          <button className="btn btn-lg btn-primary w-full" disabled={loading}>
            Add New Customer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerScreen;
