import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../css/styles.css';
import Cookies from 'js-cookie';
import LoginSimpleTopNavbar from "../components/Nav/LogIn-SimpleTopNavBar";

const CitasPendientes = () => {
  const [userRole, setUserRole] = useState(null);
  const [citas, setCitas] = useState([]);

  const fetchCitas = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5500/api/cita');
      const citasData = await Promise.all(response.data.map(async (cita) => {
        const userResponse = await axios.get(`http://localhost:5500/api/users/${cita.rut_user}`);
        console.log('User data:', userResponse.data);
        const userData = userResponse.data;
        return { ...cita, user: userData };
      }));
      setCitas(citasData);
    } catch (err) {
      console.error('Error al obtener las citas:', err);
    }
  }, []);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUserRole(decodedToken.rol);
      } catch (error) {
        console.log('Error decoding token:', error);
      }
    }
  }, []);

  useEffect(() => {
    fetchCitas();
  }, [fetchCitas]);

  const updateCitaEstado = async (id, nuevoEstado) => {
    try {
      await axios.put(`http://localhost:5500/api/cita/${id}/estado`, { estado: nuevoEstado });
      fetchCitas();
    } catch (err) {
      console.error('Error al actualizar el estado de la cita:', err);
    }
  };

  return (
    <>
      <LoginSimpleTopNavbar/>
      <div className="container" style={{ marginTop: '120px' }}>
        <div className="box">
          <h1 className="subtitle is-4 has-text-centered">Citas Pendientes</h1>
          <div className="content">
            {citas.length === 0 ? (
              <p className="has-text-centered">No hay citas pendientes.</p>
            ) : (
              <ul className="cita-list">
                {citas.map(cita => (
                  <li key={cita.id_cita} className="box contacto-item" style={{ marginBottom: '20px' }}>
                    <div className="columns is-vcentered is-mobile">
                      <div className="column">
                        <p><strong>Fecha:</strong> {new Date(cita.fecha_cita).toLocaleDateString()}</p>
                        <p><strong>Tipo:</strong> {cita.tipo_cita === 1 ? 'Instalación' : 'Mantenimiento'}</p>
                        {cita.comentarios && (
                          <p><strong>Comentarios:</strong> {cita.comentarios}</p>
                        )}
                      </div>
                      <div className="column is-narrow">
                        {userRole === 2 ? (
                          <button 
                            className="button is-danger is-small" 
                            onClick={() => {
                              const nuevoEstado = cita.estado === 1 ? 0 : 1;
                              updateCitaEstado(cita.id_cita, nuevoEstado);
                            }}
                            style={{ padding: '0 8px' }}>
                            <label htmlFor={`switch-${cita.id_cita}`} className="switch-label">
                              {cita.estado === 1 ? 'Confirmada' : 'Por Confirmar'}
                            </label>
                          </button>
                        ) : (
                          <span>{cita.estado === 1 ? 'Confirmada' : 'Por Confirmar'}</span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CitasPendientes;