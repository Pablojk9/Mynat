import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import NormalTopNavbar from "../components/Nav/NormalTopNavBar";
import LogInTopNavbar from "../components/Nav/LogInTopNavBar";
import Header from "../components/Sections/Header";
import Nosotros from "../components/Sections/Nosotros";
import Servicios from "../components/Sections/Servicios";
import Catalogo from "../components/Sections/Catalogo";
import Contacto from "../components/Sections/Contacto";
import Footer from "../components/Sections/Footer";

const checkSession = () => {
  const token = Cookies.get("token");
  console.log("Token from cookie:", token);
  return token ? true : false;
};

export default function Landing() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = checkSession();
    console.log("Is Authenticated:", authStatus);
    setIsAuthenticated(authStatus);
  }, []);

  return (
    <>
      {isAuthenticated ? <LogInTopNavbar /> : <NormalTopNavbar />}
      <Header />
      <Nosotros />
      <Servicios />
      <Catalogo />
      <Contacto />
      <Footer />
    </>
  );
}