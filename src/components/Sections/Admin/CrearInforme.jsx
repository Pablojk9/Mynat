import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { validarRut } from "../../utils/valida_rut";
import "../../../css/styles.css";

const CreateInforme = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    rutUser: '',
    fechaInforme: '',
    informe: null
  });

  useEffect(() => {
    let isMounted = true;

    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        if (decodedToken.rol !== null && decodedToken.rol !== "" && isMounted) {
          navigate('/landing');
        }
      } catch (error) {
        console.log("Error decoding token:", error);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'rutUser') {
      const rutFormateado = formatearRut(value);
      setForm({ ...form, rutUser: rutFormateado });
    } else {
      setForm({ ...form, [id]: value });
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

  const handleFileChange = (e) => {
    setForm({ ...form, informe: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarRut(form.rutUser)) {
      alert('El RUT ingresado no es válido');
      return;
    }

    const { rutUser, fechaInforme, informe } = form;

    const formData = new FormData();
    formData.append('rut_user', rutUser);
    formData.append('fecha_informe', fechaInforme);
    formData.append('informe', informe);

    try {
      const response = await fetch('http://localhost:5500/api/informes', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      setForm({
        rutUser: '',
        fechaInforme: '',
        informe: null
      });

      alert('Informe creado exitosamente');
    } catch (error) {
      alert('Error al crear el informe: ' + error.message);
    }
  };

  return (
    <>
      <div className="hero-body" style={{ marginTop: '0px' }}>
        <div className="container has-text-centered">
          <div className="box">
            <p className="subtitle is-4">Crear Informe</p>
            <br />
            <form id="createInformeForm" onSubmit={handleSubmit}>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-medium"
                    id="rutUser"
                    placeholder="RUT del usuario"
                    value={form.rutUser}
                    onChange={handleChange}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-id-card"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-medium"
                    type="date"
                    id="fechaInforme"
                    placeholder="Fecha del informe"
                    value={form.fechaInforme}
                    onChange={handleChange}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-calendar"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-medium"
                    type="file"
                    id="informe"
                    onChange={handleFileChange}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-file-pdf"></i>
                  </span>
                </p>
              </div>
              <button type="submit" className="button is-block is-danger is-large is-fullwidth">
                Crear Informe
              </button>
              <br />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateInforme;