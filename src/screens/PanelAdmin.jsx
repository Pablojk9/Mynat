import React, { useEffect, useState } from "react";
import TopNavbar from "../components/Nav/LogIn-SimpleTopNavBar";
import AtenderContactos from "../components/Sections/Admin/AtenderContactos";
import CambiarRol from "../components/Sections/Admin/CambiarRol";
import CambiarInformacion from "../components/Sections/Admin/CambiarInformacion";
import Cookies from "js-cookie";
import AgregarProducto from "../components/Sections/Admin/AgregarProducto";
import CambiarProducto from "../components/Sections/Admin/CambiarProducto";
import CrearInformes from "../components/Sections/Admin/CrearInforme";


export default function PanelAdmin() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setUserRole(decodedToken.rol);
      } catch (error) {
        console.log("Error decoding token:", error);
      }
    }
  }, []);

  return (
    <>
      {userRole === 2 && (
        <>
          <TopNavbar />
          <AtenderContactos />
          <CrearInformes />
          <CambiarRol />
          <CambiarInformacion />
          <AgregarProducto />
          <CambiarProducto />
        </>
      )}
    </>
  );
}