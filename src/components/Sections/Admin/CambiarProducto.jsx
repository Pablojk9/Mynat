import React, { useState, useEffect } from 'react';
import "../../../css/styles.css";

const UpdateProduct = () => {
  const [form, setForm] = useState({
    idProducto: '',
    nombreProducto: '',
    tipoProducto: '',
    descripcionProducto: '',
    precioOriginal: '',
    oferta: '',
    stock: '',
    precioFinal: '',
    imagenActual: ''
  });

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost:5500/api/productos');
      if (!response.ok) {
        throw new Error('Error al obtener productos');
      }
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      alert('Error al obtener productos: ' + error.message);
    }
  };

  const fetchProductData = async (id) => {
    try {
      const response = await fetch(`http://localhost:5500/api/productos/${id}`);
      if (!response.ok) {
        throw new Error('Producto no encontrado');
      }
      const product = await response.json();
      setForm({
        idProducto: id,
        nombreProducto: product.nombre_producto,
        tipoProducto: product.tipo_producto,
        descripcionProducto: product.descripcion_producto,
        precioOriginal: product.precio_original_producto,
        oferta: product.oferta_producto,
        stock: product.stock,
        precioFinal: product.precio_oferta_producto,
        imagenActual: product.imagen_url
      });
    } catch (error) {
      alert('Error al obtener el producto: ' + error.message);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  useEffect(() => {
    const calcularPrecioFinal = () => {
      const precioOriginalFloat = parseFloat(form.precioOriginal);
      const ofertaFloat = parseFloat(form.oferta);
      if (!isNaN(precioOriginalFloat) && !isNaN(ofertaFloat)) {
        const precioFinal = precioOriginalFloat * (1 - ofertaFloat / 100);
        setForm(prevForm => ({ ...prevForm, precioFinal: precioFinal.toFixed(2) }));
      }
    };

    calcularPrecioFinal();
  }, [form.precioOriginal, form.oferta]);

  const handleSelectChange = (e) => {
    const idProducto = e.target.value;
    setForm(prevForm => ({ ...prevForm, idProducto }));
    fetchProductData(idProducto);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { idProducto, nombreProducto, tipoProducto, descripcionProducto, precioOriginal, oferta, stock, precioFinal, imagenActual } = form;

    try {
      const url = `http://localhost:5500/api/productos/${idProducto}`;
      const body = {
        nombre_producto: nombreProducto,
        tipo_producto: tipoProducto,
        descripcion_producto: descripcionProducto,
        precio_original_producto: parseFloat(precioOriginal),
        oferta_producto: parseFloat(oferta),
        precio_oferta_producto: parseFloat(precioFinal),
        stock: parseInt(stock),
        imagen_url: imagenActual
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
      alert('Producto actualizado exitosamente');
    } catch (error) {
      alert('Error al actualizar el producto: ' + error.message);
    }
  };

  return (
    <>
      <div className="hero-body" style={{ marginTop: '0px'}}>
        <div className="container has-text-centered">
          <div className="box">
            <p className="subtitle is-4">Actualizar Producto</p>
            <br />
            <form id="updateProductForm" onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Seleccione el Producto</label>
                <div className="control">
                  <div className="select is-medium">
                    <select value={form.idProducto} onChange={handleSelectChange} required>
                      <option value="">Seleccione un producto</option>
                      {productos.map(producto => (
                        <option key={producto.id_producto} value={producto.id_producto}>
                          {producto.nombre_producto}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-medium"
                    type="text"
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
                      <option value="2">Generador eléctrico</option>
                      <option value="3">Bomba Hidráulica</option>
                      <option value="4">Caldera Industrial</option>
                      <option value="5">Caldera de Edificios</option>
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
                    type="text"
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
                <label className="label">¿Tiene stock?</label>
                <div className="control">
                  <div className="select">
                    <select id="stock" name="stock" value={form.stock} onChange={handleChange}>
                      <option value="1">Con existencias</option>
                      <option value="0">Sin existencias</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
              <label className="label">Imagen Actual:</label>
              <div className="control" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {form.imagenActual ? (
                  <img
                    src={`http://localhost:5500/uploads/productos/${form.imagenActual}`}
                    alt="Imagen actual"
                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                  />
                ) : (
                  <p>Ninguna imagen seleccionada</p>
                )}
              </div>
            </div>
              <button type="submit" className="button is-block is-danger is-large is-fullwidth">
                Actualizar Producto
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