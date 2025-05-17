import React from "react";
import { Link, Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div>
      <nav className="bg-red-500 text-[20px] text-white p-5 px-15 flex space-x-10 justify-end">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
