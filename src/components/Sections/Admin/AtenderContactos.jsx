import React, { useState, useEffect, useCallback } from 'react';
import "../../../css/styles.css";
import axios from 'axios';

const AtenderContactos = () => {
  const [contactos, setContactos] = useState([]);

  const fetchContactos = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5500/api/contacto/0');
      setContactos(response.data.filter(contacto => contacto.telefono !== '56'));
    } catch (err) {
      console.error('Error al obtener los contactos:', err);
    }
  }, []);

  useEffect(() => {
    fetchContactos();
  }, [fetchContactos]);

  const toggleEstado = async (id, estadoActual) => {
    const userConfirmed = window.confirm("¿Estás seguro de ocultar la solicitud?");
    if (userConfirmed) {
      try {
        const nuevoEstado = 1;
        await axios.put(`http://localhost:5500/api/contacto/${id}`, { estado: nuevoEstado });
        fetchContactos();
      } catch (err) {
        console.error('Error al actualizar el estado del contacto:', err);
      }
    }
  };

  return (
    <div className="container" style={{ marginTop: '120px'}}>
      <div className="box">
        <p className="subtitle is-4 has-text-centered">Atender Contactos</p>
        <div className="content">
          {contactos.length === 0 ? (
            <p className="has-text-centered">Sin mensajes pendientes</p>
          ) : (
            <ul className="contacto-list">
              {contactos.map(contacto => (
                <li key={contacto.id_contacto} className="box contacto-item" style={{ marginBottom: '20px' }}>
                  <div className="columns is-vcentered is-mobile">
                    <div className="column">
                      <p><strong>{contacto.nombre}</strong></p>
                      <p><strong>Telefono:</strong> +{contacto.telefono}</p>
                      <p><strong>Correo:</strong> {contacto.correo}</p>
                      <p><strong>Mensaje:</strong><br />{contacto.mensaje}</p>
                    </div>
                    <div className="column is-narrow">
                      <button 
                        className="button is-danger is-small" 
                        onClick={() => toggleEstado(contacto.id_contacto, contacto.estado)}
                        style={{ padding: '0 8px' }}>
                        Ocultar solicitud
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AtenderContactos;