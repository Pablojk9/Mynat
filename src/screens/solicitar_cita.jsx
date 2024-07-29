import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoginSimpleTopNavbar from "../components/Nav/LogIn-SimpleTopNavBar";

const SolicitarCita = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [tipoCita, setTipoCita] = useState(1);
  const [comentarios, setComentarios] = useState('');
  const [rut, setRut] = useState('');
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUserRole(decodedToken.rol);
        setRut(decodedToken.id);
      } catch (error) {
        console.log('Error decoding token:', error);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formattedDate = startDate.toISOString().split('T')[0];
    
    const citaData = {
      rut_user: rut,
      fecha_cita: formattedDate,
      tipo_cita: tipoCita,
      comentarios: comentarios,
    };
    
    try {
      const response = await fetch(`http://localhost:5500/api/cita`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(citaData),
      });
  
      if (!response.ok) {
        throw new Error('Error al crear la cita');
      }
      alert('Cita creada exitosamente');
      navigate('/landing');
    } catch (error) {
      console.error('Error al crear la cita:', error);
      alert('Error al crear la cita: ' + error.message);
    }
  };

  return (
    <>
    {userRole === 2 || userRole === 1 || userRole === 0 ? (
      <>
      <LoginSimpleTopNavbar/>
      <div style={{ maxWidth: '600px', margin: '0 auto', marginTop: '120px' }}>
        <h2 style={{ textAlign: 'center' }}>Solicitar Cita</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Fecha de la Cita:</label>
            <input
              type="date"
              value={startDate.toISOString().split('T')[0]}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              min={new Date().toISOString().split('T')[0]}
              max={(function() {
                const maxDate = new Date();
                maxDate.setMonth(maxDate.getMonth() + 3);
                return maxDate.toISOString().split('T')[0];
              })()}
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Tipo de Cita:</label>
            <select
              value={tipoCita}
              onChange={(e) => setTipoCita(parseInt(e.target.value))}
              style={{ width: '100%', padding: '0.5rem' }}
            >
              <option value={1}>Instalación</option>
              <option value={2}>Mantenimiento</option>
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Comentarios:</label>
            <textarea
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
              placeholder="Añadir comentarios (opcional)"
              style={{ width: '100%', padding: '0.5rem', minHeight: '100px' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#007BFF', color: 'white', border: 'none' }}>Agendar Cita</button>
        </form>
      </div>
      </>
      ) : null}
    </>
  );
};

export default SolicitarCita;