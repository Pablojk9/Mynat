import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoSVG from "../assets/svg/Logo.svg";
import { validarRut } from "../utils/valida_rut";
import TopNavbar from "../components/Nav/SimpleTopNavBar";
import "../css/styles.css";
import Cookies from "js-cookie";

const CreateUser = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    rut: '',
    nombre: '',
    apellidos: '',
    telefono: '+56',
    correo: '',
    contraseña: ''
  });

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

  const limitarTelefono = (e) => {
    const maxLength = 12;
    const valorInicial = '+56';
    let valor = e.target.value.trim();
    if (!valor.startsWith(valorInicial)) {
      valor = valorInicial;
    }
    if (valor.length > maxLength) {
      valor = valor.slice(0, maxLength);
    }
    setForm({ ...form, telefono: valor });
  };

  const handleChange = (e) => {
    if (e.target.id === 'rut') {
      const rutFormateado = formatearRut(e.target.value);
      setForm({ ...form, rut: rutFormateado });
    } else {
      setForm({ ...form, [e.target.id]: e.target.value });
    }
  };

  const formatearRut = (rut) => {
    rut = rut.replace(/[^\dkK]/g, '');
    let dv = rut.slice(-1);
    let rutSinDv = rut.slice(0, -1);
    let rutFormateado = '';
    while (rutSinDv.length > 3) {
      rutFormateado = '.' + rutSinDv.slice(-3) + rutFormateado;
      rutSinDv = rutSinDv.slice(0, -3);
    }
    rutFormateado = rutSinDv + rutFormateado;
    rutFormateado = rutFormateado + '-' + dv;
    return rutFormateado;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarRut(form.rut)) {
      alert('El Rut ingresado no es válido');
      return;
    }

    try {
      const response = await fetch('http://localhost:5500/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      navigate('/login');
    } catch (error) {
      alert('Error al crear el usuario: ' + error.message);
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
            <p className="subtitle is-4">Crear usuario</p>
            <br />
            <form id="createUserForm" onSubmit={handleSubmit}>
              <div className="field">
                <div className="control has-icons-left">
                  <input
                    className="input is-medium"
                    type="text"
                    id="rut"
                    placeholder="Rut"
                    maxLength="12"
                    value={form.rut}
                    onChange={handleChange}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-address-card"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <div className="control has-icons-left">
                  <input
                    className="input is-medium"
                    id="nombre"
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user-alt"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <div className="control has-icons-left">
                  <input
                    className="input is-medium"
                    id="apellidos"
                    placeholder="Apellidos"
                    value={form.apellidos}
                    onChange={handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user-alt"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <div className="control has-icons-left">
                  <input
                    className="input is-medium"
                    type="tel"
                    id="telefono"
                    placeholder="+56"
                    value={form.telefono}
                    onChange={limitarTelefono}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-phone-alt"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <div className="control has-icons-left">
                  <input
                    className="input is-medium"
                    type="email"
                    id="correo"
                    placeholder="Correo"
                    value={form.correo}
                    onChange={handleChange}
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
                    value={form.contraseña}
                    onChange={handleChange}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </div>
              </div>
              <button type="submit" className="button is-block is-info is-large is-fullwidth">Crear usuario</button><br />
            </form>
          </div>
          <p className="has-text-grey " >
            <a href="/login">Ya tengo una cuenta</a> &nbsp;
          </p>
        </div>
      </div>
    </div>
  </>
  );
};

export default CreateUser;