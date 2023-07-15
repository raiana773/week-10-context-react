import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div>
      <Navbar />
      {/* ототбражает ту страницу на которой мы находимся */}
      <Outlet />
    </div>
  );
}

export default MainLayout;
