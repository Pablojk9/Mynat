import React, { useState } from 'react';
import { validarRut } from "../../../utils/valida_rut";
import "../../../css/styles.css";

const UpdateRole = () => {
  const [form, setForm] = useState({
    rut: '',
    rol_user: '0'
  });

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

    const { rut, rol_user } = form;

    try {
      const response = await fetch(`http://localhost:5500/api/users/${rut}/rol-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rol_user })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      alert('Rol actualizado exitosamente');
    } catch (error) {
      alert('Error al actualizar el rol: ' + error.message);
    }
  };

  return (
    <>
      <div className="hero-body" style={{ marginTop: '60px'}}>
        <div className="container has-text-centered">
            <div className="box">
              <p className="subtitle is-4">Cambiar roles</p>
              <br />
              <form id="updateRoleForm" onSubmit={handleSubmit}>
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
                  <label className="label">Nuevo Rol</label>
                  <div className="control">
                    <div className="select">
                      <select id="rol_user" name="rol_user" value={form.rol_user} onChange={handleChange}>
                        <option value="0">Usuario</option>
                        <option value="1">Tecnico</option>
                        <option value="2">Administrador</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button type="submit" className="button is-block is-success is-large is-fullwidth">Actualizar Rol</button><br />
              </form>
            </div>
        </div>
      </div>
    </>
  );
};

export default UpdateRole;