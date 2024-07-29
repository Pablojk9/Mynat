import React, { useState, useEffect } from 'react';
import "../../../css/styles.css";

const CreateProduct = () => {
  const [form, setForm] = useState({
    nombreProducto: '',
    tipoProducto: '',
    descripcionProducto: '',
    precioOriginal: '',
    oferta: '',
    precioFinal: '',
    imagen: null
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, imagen: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tipoProductoInt = parseInt(form.tipoProducto);
    if (isNaN(tipoProductoInt)) {
      alert('Por favor selecciona un tipo de producto válido');
      return;
    }

    const { nombreProducto, descripcionProducto, precioOriginal, oferta, precioFinal, imagen } = form;

    const formData = new FormData();
    formData.append('nombre_producto', nombreProducto);
    formData.append('tipo_producto', tipoProductoInt);
    formData.append('descripcion_producto', descripcionProducto);
    formData.append('precio_original_producto', precioOriginal);
    formData.append('oferta_producto', oferta);
    formData.append('precio_oferta_producto', precioFinal);
    formData.append('imagen', imagen);

    try {
      const response = await fetch('http://localhost:5500/api/productos', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      alert('Producto creado exitosamente');
    } catch (error) {
      alert('Error al crear el producto: ' + error.message);
    }
  };

  useEffect(() => {
    const calcularPrecioFinal = () => {
      const precioOriginal = parseFloat(form.precioOriginal);
      const oferta = parseFloat(form.oferta);
      if (!isNaN(precioOriginal) && !isNaN(oferta)) {
        const precioFinal = precioOriginal * (1 - oferta / 100);
        setForm((prevForm) => ({ ...prevForm, precioFinal: precioFinal.toFixed(2) }));
      }
    };
    calcularPrecioFinal();
  }, [form.precioOriginal, form.oferta]);

  return (
    <>
      <div className="hero-body" style={{ marginTop: '0px'}}>
        <div className="container has-text-centered">
            <div className="box">
              <p className="subtitle is-4">Crear producto</p>
              <br />
              <form id="createProductForm" onSubmit={handleSubmit}>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-medium"
                      id="nombreProducto"
                      placeholder="Nombre del producto"
                      value={form.nombreProducto}
                      onChange={handleChange}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-box"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <label className="label">Tipo de Producto</label>
                  <div className="control">
                    <div className="select">
                      <select id="tipoProducto" name="tipoProducto" value={form.tipoProducto} onChange={handleChange}>
                        <option value="">Seleccionar Opción</option>
                        <option value="2">Generador Eléctrico</option>
                        <option value="3">Bombas Hidráulicas</option>
                        <option value="4">Calderas Industriales</option>
                        <option value="5">Calderas para Edificios</option>
                        <option value="6">Calderas Domiciliarias</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-medium"
                      id="descripcionProducto"
                      placeholder="Descripción del producto"
                      value={form.descripcionProducto}
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
                      type="number"
                      id="precioOriginal"
                      placeholder="Precio original"
                      value={form.precioOriginal}
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
                      type="number"
                      id="oferta"
                      placeholder="Oferta (%)"
                      value={form.oferta}
                      onChange={handleChange}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-percentage"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-medium"
                      type="number"
                      id="precioFinal"
                      placeholder="Precio final"
                      value={form.precioFinal}
                      readOnly
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-tag"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-medium"
                      type="file"
                      id="imagen"
                      onChange={handleFileChange}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-image"></i>
                    </span>
                  </p>
                </div>
                <button type="submit" className="button is-block is-danger is-large is-fullwidth">
                  Crear Producto
                </button>
                <br />
              </form>
            </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;