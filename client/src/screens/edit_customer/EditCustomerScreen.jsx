import React, { useEffect, useState } from "react";
import HamburgerMenu from "../../components/HamburgerMenu";
import axios from "axios";
import { Back } from "iconsax-react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorsMessages from "../../components/ErrorsMessage";
import { Alert, AlertIcon, CloseButton } from "@chakra-ui/react";

const EditCustomerScreen = () => {
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
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

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

  async function getCurrentCustomer() {
    try {
      const res = await axios.get(`/api/customer/${params.userId}`);
      setForm({
        name: res.data.name,
        level_id: res.data.level_id,
        menu_id: res.data.menu_id,
        quantity: res.data.quantity,
        total_transaction: res.data.total_transaction,
      });
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
      setUpdateSuccess(false);
      clearErrors();
      setLoading(true);
      const res = await axios.put(
        "/api/update_customer/" + params.userId,
        form
      );
      console.log({ res });
      setLoading(false);
      setUpdateSuccess(true);
    } catch (error) {
      console.log(error.response);
      getErrorMsg(error.response.data.errors);
      setLoading(false);
    }
  }

  useEffect(() => {
    getLevel();
    getMenu();
    getCurrentCustomer();
  }, [params.userId]);

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
          <h1 className="heading">Edit Customer {form.name}</h1>
        </div>
      </div>

      <div className="content-main">
        {/* errors */}
        <ErrorsMessages errors={errors} clearErrors={clearErrors} />
        {/* success */}
        {updateSuccess && (
          <Alert status="success">
            <AlertIcon />
            Data berhasil diubah !
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => setUpdateSuccess(false)}
            />
          </Alert>
        )}

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
              value={form.level_id}
            >
              <option>-- pilih --</option>
              {level.map((data) => (
                <option value={data.id} key={data.id}>
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
              value={form.menu_id}
            >
              <option>-- pilih --</option>
              {menu.map((data) => (
                <option value={data.id} key={data.id} price={data.price}>
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
            Save Change
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCustomerScreen;
