//importing react library from react into this js file
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";

//Arrow function
const Main = () => {
  return (
   <div>
    {/* Rendering the Header,Footer component and Outlet */}
    <Header/>
    <Outlet/>
    <Footer/>
  </div>
  );
};

export default Main;