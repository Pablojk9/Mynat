import React, { useState, useEffect } from 'react';
import "../css/styles.css";
import axios from 'axios';
import Cookies from 'js-cookie';
import LoginSimpleTopNavbar from "../components/Nav/LogIn-SimpleTopNavBar";

const ListInformes = () => {
  const [informes, setInformes] = useState([]);

  useEffect(() => {
    const fetchInformes = async () => {
      const token = Cookies.get("token");
      if (!token) {
        console.error('No token found');
        return;
      }

      console.log('Token:', token);

      try {
        const response = await axios.get('http://localhost:5500/api/informes', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Response:', response);
        setInformes(response.data);
      } catch (err) {
        console.error('Error fetching informes:', err);
      }
    };

    fetchInformes();
  }, []);

  return (
    <>
      <LoginSimpleTopNavbar />
      <div className="container" style={{ marginTop: '120px' }}>
        <div className="box">
          <p className="subtitle is-4 has-text-centered">Listar Informes</p>
          <div className="content">
            {informes.length === 0 ? (
              <p className="has-text-centered">No hay informes disponibles</p>
            ) : (
              <ul className="informe-list">
                {informes.map(informe => (
                  <li key={informe.id_informe} className="box informe-item" style={{ marginBottom: '20px' }}>
                    <p><strong>Fecha del informe:</strong> {new Date(informe.fecha_informe).toLocaleDateString()}</p>
                    <a href={`http://localhost:5500/uploads/informes/${informe.pdf_url}`} download>
                      Descargar {informe.pdf_url}
                    </a>
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

export default ListInformes;