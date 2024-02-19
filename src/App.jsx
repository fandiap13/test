import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardScreen from "./screens/dashboard/DashboardScreen";
import "./App.scss";
import BaseLayout from "./layout/BaseLayout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<DashboardScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
