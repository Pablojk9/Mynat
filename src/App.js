import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Landing from "./screens/Landing";
import CreateUser from "./screens/CreateUser";
import LoginUser from "./screens/LoginUser";
import CatalogoCompleto from "./screens/catalogo_completo";
import CatalogoFiltrado from "./screens/catalogo_filtrado";
import ConfigurarCuenta from "./screens/ConfigurarCuenta";
import CrearCita from "./screens/solicitar_cita";
import Agenda from "./screens/Agenda";
import Historial from "./screens/Historial";
import PanelAdmin from "./screens/PanelAdmin";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
      </Helmet>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/registro" element={<CreateUser />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/catalogo_completo" element={<CatalogoCompleto />} />
            <Route path="/catalogo_filtrado/:tipoProducto" element={<CatalogoFiltrado />} />
            <Route path="/panel_admin" element={<PanelAdmin />} />
            <Route path="/configurar_cuenta" element={<ConfigurarCuenta />} />
            <Route path="/solicitar_cita" element={<CrearCita />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/historial" element={<Historial />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}