import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import LoginSimpleTopNavbar from "../components/Nav/LogIn-SimpleTopNavBar";
import SimpleTopNavbar from "../components/Nav/SimpleTopNavBar";

const checkSession = () => {
  const token = Cookies.get("token");
  console.log("Token from cookie:", token);
  return token ? true : false;
};

const CatalogoFiltrado = () => {
  const { tipoProducto } = useParams();
  const [productos, setProductos] = useState([]);
  const [informacion, setInformacion] = useState({ numeroWhatsapp: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = checkSession();
    console.log("Is Authenticated:", authStatus);
    setIsAuthenticated(authStatus);
  }, []);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const response = await fetch(`http://localhost:5500/api/productos/tipo/${tipoProducto}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
        const productos = await response.json();
        setProductos(productos);
      } catch (error) {
        alert('Error al obtener los productos: ' + error.message);
      }
    }

    async function fetchInformacion() {
      try {
        const response = await fetch("http://localhost:5500/api/informacion/1");
        if (!response.ok) {
          throw new Error("Error al obtener la información");
        }
        const informacion = await response.json();
        setInformacion({ numeroWhatsapp: informacion.numero_whatsapp });
      } catch (error) {
        console.error("Error al obtener la información: ", error);
      }
    }

    fetchProductos();
    fetchInformacion();
  }, [tipoProducto]);

  const buildWhatsAppMessageURL = (message) => {
    const phoneNumber = informacion.numeroWhatsapp;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/56${phoneNumber}/?text=${encodedMessage}`;
  };

  const handleSolicitarClick = (nombreProducto) => {
    const message = `Hola, estoy interesad@ en el producto "${nombreProducto}".`;
    const url = buildWhatsAppMessageURL(message);
    window.open(url, "_blank");
  };

  return (
    <>
      {isAuthenticated ? <LoginSimpleTopNavbar /> : <SimpleTopNavbar />}
      <Helmet>
        <link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma-social@1/bin/bulma-social.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.13.0/css/all.min.css" />
      </Helmet>
      <div className="hero-body" style={{ marginTop: '100px' }}>
        <div className="container">
          {productos.length === 0 ? (
            <p>Sin existencias de productos para {tipoProducto}</p>
          ) : (
            <div className="columns is-multiline is-centered">
              {productos.map(producto => (
                <div key={producto.id_producto} className="column is-4">
                  <div className="producto-item box">
                    <div className="producto-info">
                      <h2>{producto.nombre_producto}</h2>
                        <img src={`http://localhost:5500/uploads/productos/${producto.imagen_url}`} alt={producto.nombre_producto} style={{ maxWidth: '200px', maxHeight: '200px' }}/>
                      <p>{producto.descripcion_producto}</p>
                    </div>
                    {producto.stock === 1 ? (
                      <button className="button-solicitar" onClick={() => handleSolicitarClick(producto.nombre_producto)}>
                        Solicitar por Whatsapp
                      </button>
                    ) : (
                      <button className="button" style={{ backgroundColor: '#007bff', cursor: 'default' }} disabled>
                        Sin stock
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CatalogoFiltrado;