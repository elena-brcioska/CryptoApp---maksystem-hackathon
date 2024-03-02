import React from "react";
import { Outlet } from "react-router";
import ButtonAppBar from "../components/AppBar/AppBar";
import Footer from "../components/Footer/Footer";
import '../globalStyles.css'

const RootLayout = () => {

  return (
    <>
    
      <ButtonAppBar />
      <main>
        <div className="media-wrapper">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
