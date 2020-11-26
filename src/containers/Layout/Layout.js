import React from "react";
import NavBar from "../../components/UI/NavBar";
import Sidebar from "../../components/UI/Sidebar";

function Layout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default Layout;
