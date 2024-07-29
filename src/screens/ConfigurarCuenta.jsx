import React, { useState, useEffect, useCallback } from "react";
import TopNavbar from "../components/Nav/LogIn-SimpleTopNavBar";
import Cookies from "js-cookie";

const UpdateUsuario = () => {
  const [form, setForm] = useState({
    rut: "",
    nombre: "",
    apellidos: "",
    telefono: "",
    correo: "",
  });
  const [userRole, setUserRole] = useState(null);

  const fetchUserData = useCallback(async (rut) => {
    try {
      const response = await fetch(`http://localhost:5500/api/users/${rut}`);
      if (!response.ok) {
        throw new Error('Error al obtener usuario');
      }
      const userData = await response.json();
      setForm({
        rut: userData.rut_user,
        nombre: userData.nombre_user,
        apellidos: userData.apellidos_user,
        telefono: userData.telefono_user,
        correo: userData.correo_user
      });
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      alert('Error al obtener el usuario: ' + error.message);
    }
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setUserRole(decodedToken.rol);
        fetchUserData(decodedToken.id); 
      } catch (error) {
        console.log("Error decoding token:", error);
      }
    }
  }, [fetchUserData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { rut, nombre, apellidos, telefono, correo } = form;

    try {
      const url = `http://localhost:5500/api/users/${rut}`;
      const body = {
        nombre: nombre,
        apellidos: apellidos,
        telefono: telefono,
        correo: correo
      };

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      alert('Usuario actualizado exitosamente');
    } catch (error) {
      alert('Error al actualizar el usuario: ' + error.message);
    }
  };

  return (
    <>
      {userRole === 2 || userRole === 1 || userRole === 0 ? (
        <>
          <TopNavbar />
          <div className="hero-body" style={{ marginTop: "0px" }}>
            <div className="container has-text-centered">
              <div className="box">
                <p className="subtitle is-4">Actualizar Cuenta</p>
                <br />
                <form id="updateUserForm" onSubmit={handleSubmit}>
                  <div className="field">
                    <p className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="text"
                        id="rut"
                        value={form.rut}
                        readOnly
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-info-circle"></i>
                      </span>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="text"
                        id="nombre"
                        placeholder="Nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-info-circle"></i>
                      </span>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="text"
                        id="apellidos"
                        placeholder="Apellidos"
                        value={form.apellidos}
                        onChange={handleChange}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-info-circle"></i>
                      </span>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="number"
                        id="telefono"
                        placeholder="Telefono"
                        value={form.telefono}
                        onChange={handleChange}
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-dollar-sign"></i>
                      </span>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="text"
                        id="correo"
                        placeholder="Correo"
                        value={form.correo}
                        onChange={handleChange}
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-percentage"></i>
                      </span>
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="button is-block is-danger is-large is-fullwidth"
                  >
                    Actualizar Cuenta
                  </button>
                  <br />
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default UpdateUsuario;