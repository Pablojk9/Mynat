import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavbar from "../components/Nav/SimpleTopNavBar";
import LogoSVG from "../assets/svg/Logo.svg";
import "../css/styles.css";
import Cookies from "js-cookie";

const LoginUser = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        if (decodedToken.rol !== null && decodedToken.rol !== "") {
          navigate('/landing');
        }
      } catch (error) {
        console.log("Error decoding token:", error);
      }
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5500/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contraseña }),
        credentials: 'include',
      });

      if (response.ok) {
        navigate('/landing');
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Por favor, intenta nuevamente.');
    }
  };

  return (
    <>
      <TopNavbar />
      <div className="hero-body" style={{ marginTop: '100px'}}>
        <div className="container has-text-centered">
          <div className="column is-4 is-offset-4">
            <div className="box">
              <img src={LogoSVG} style={{ width: 'auto', maxHeight: '80px' }} alt="logo" />
              <p className="subtitle is-4">Iniciar sesión</p>
              <br />
              <form id="LoginUserForm" onSubmit={handleSubmit}>
                <div className="field">
                  <div className="control has-icons-left">
                    <input
                      className="input is-medium"
                      type="email"
                      id="correo"
                      placeholder="Correo"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      required
                    />
                    <span className="icon is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <div className="control has-icons-left">
                    <input
                      className="input is-medium"
                      type="password"
                      id="contraseña"
                      placeholder="Contraseña"
                      value={contraseña}
                      onChange={(e) => setContraseña(e.target.value)}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </div>
                </div>
                <button type="submit" className="button is-block is-info is-large is-fullwidth">Iniciar sesión</button><br />
              </form>
            </div>
            <p className="has-text-grey " >
              <a href="/registro">No tengo una cuenta</a> &nbsp;
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginUser;