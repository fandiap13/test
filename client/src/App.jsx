import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardScreen from "./screens/dashboard/DashboardScreen";
import "./App.scss";
import BaseLayout from "./layout/BaseLayout";
import AddCustomerScreen from "./screens/add_customer/AddCustomerScreen";
import EditCustomerScreen from "./screens/edit_customer/EditCustomerScreen";

function App() {
  return (
    <>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<DashboardScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/add-customer" element={<AddCustomerScreen />} />
          <Route
            path="/edit-customer/:userId"
            element={<EditCustomerScreen />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
