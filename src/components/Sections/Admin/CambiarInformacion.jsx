import React, { useState, useEffect } from 'react';
import "../../../css/styles.css";

const UpdateProduct = () => {
  const [form, setForm] = useState({
    correo: '',
    numeroTelefono: '',
    numeroWhatsapp: '',
    Region: '',
    Comuna: '',
    Direccion: '',
    titulo1: '',
    titulo2: ''
  });

  useEffect(() => {
    fetchInformacionData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const fetchInformacionData = async () => {
    try {
      const response = await fetch(`http://localhost:5500/api/informacion/1`);
      if (!response.ok) {
        throw new Error('Informacion no encontrada');
      }
      const informacion = await response.json();
      setForm({
        correo: informacion.correo,
        numeroTelefono: informacion.numero_telefono,
        numeroWhatsapp: informacion.numero_whatsapp,
        Region: informacion.region,
        Comuna: informacion.comuna,
        Direccion: informacion.direccion,
        titulo1: informacion.titulo1,
        titulo2: informacion.titulo2
      });
    } catch (error) {
      alert('Error al obtener la informacion: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { correo, numeroTelefono, numeroWhatsapp, Region, Comuna, Direccion, titulo1, titulo2 } = form;

    try {
      const response = await fetch(`http://localhost:5500/api/informacion/1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          correo: correo,
          numero_telefono: numeroTelefono,
          numero_whatsapp: numeroWhatsapp,
          region: Region,
          comuna: Comuna,
          direccion: Direccion,
          titulo1: titulo1,
          titulo2: titulo2
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      alert('Informacion actualizada exitosamente');
    } catch (error) {
      alert('Error al actualizar la informacion: ' + error.message);
    }
  };

  return (
    <>
      <div className="hero-body" style={{ marginTop: '0px' }}>
        <div className="container has-text-centered">
          <div className="box">
            <p className="subtitle is-4">Actualizar Informacion Importante</p>
            <br />
            <form id="updateProductForm" onSubmit={handleSubmit}>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-medium"
                    type="email"
                    id="correo"
                    placeholder="Correo de contacto"
                    value={form.correo}
                    onChange={handleChange}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-medium"
                    type="number"
                    id="numeroTelefono"
                    placeholder="Numero de telefono"
                    value={form.numeroTelefono}
                    onChange={handleChange}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-phone"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-medium"
                    type="number"
                    id="numeroWhatsapp"
                    placeholder="Numero de Whatsapp"
                    value={form.numeroWhatsapp}
                    onChange={handleChange}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-whatsapp"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-medium"
                    type="text"
                    id="Region"
                    placeholder="Region"
                    value={form.Region}
                    onChange={handleChange}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-medium"
                    type="text"
                    id="Comuna"
                    placeholder="Comuna"
                    value={form.Comuna}
                    onChange={handleChange}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-medium"
                    type="text"
                    id="Direccion"
                    placeholder="Direccion"
                    value={form.Direccion}
                    onChange={handleChange}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-medium"
                    type="text"
                    id="titulo1"
                    placeholder="Titulo 1"
                    value={form.titulo1}
                    onChange={handleChange}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-medium"
                    type="text"
                    id="titulo2"
                    placeholder="Titulo 2"
                    value={form.titulo2}
                    onChange={handleChange}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
              <button type="submit" className="button is-block is-danger is-large is-fullwidth">
                Actualizar Informacion
              </button>
              <br />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;