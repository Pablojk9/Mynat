import React, { useState } from 'react';
import styled from "styled-components";

import ContactImg1 from "../../assets/img/SN2.png";


const CreateContacto = () => {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    telefono: '+56',
    mensaje: ''
  });

  const limitarTelefono = (e) => {
    const maxLength = 12;
    const valorInicial = '+56';
    let valor = e.target.value.trim();
    if (!valor.startsWith(valorInicial)) {
      valor = valorInicial;
    }
    if (valor.length > maxLength) {
      valor = valor.slice(0, maxLength);
    }
    setForm({ ...form, telefono: valor });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!form.nombre || form.nombre.trim() === '') {
      alert('El campo Nombre es obligatorio');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5500/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      alert('Mensaje enviado correctamente');
      window.location.reload();
    } catch (error) {
      alert('Error al enviar el mensaje: ' + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <Wrapper id="contacto">
      <div className="hero-body" style={{ marginTop: '0px' }}>
        <div className="container has-text-centered">
          <Row>
            <ContactImgBox>
              <img
                src={ContactImg1}
                alt="Imagen de contacto"
                className="radius6"
                style={{ borderTop: '0px', maxWidth: '500px' }}
              />
            </ContactImgBox>
            <ContactForm>
              <HeaderInfo>
                <h1 className="font40 extraBold">Contacto</h1>
                <p className="font20">
                  Escríbenos y en breve nos pondremos en contacto contigo
                </p>
              </HeaderInfo>
              <Form onSubmit={handleSubmit}>
                <label className="font20">Nombre*</label>
                <input 
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
                <label className="font20">Correo*</label>
                <input 
                  type="email"
                  id="correo"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                  required
                />
                <label className="font20">Teléfono</label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  onChange={limitarTelefono}
                  placeholder="+56"
                  value={form.telefono}
                />
                <label className="font20">Mensaje*</label>
                <textarea 
                  rows="4"
                  cols="50"
                  id="mensaje"
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  required
                />
                <SendContacto type="submit">
                  Enviar mensaje
                </SendContacto>
              </Form>
            </ContactForm>
          </Row>
        </div>
      </div>
    </Wrapper>
  );
}

export default CreateContacto;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
`;

const ContactImgBox = styled.div`
  display: flex;
  max-width: 500px;
  margin-right: 20px;

  img {
    width: 100%;
    border-radius: 6px;
  }

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const ContactForm = styled.div`
  flex: 1;
  text-align: left; 
  width: 100%;
  max-width: 500px;
`;

const HeaderInfo = styled.div`
  margin-bottom: 20px;

  h1 {
    font-size: 40px;
    font-weight: 800;
  }

  p {
    font-size: 20px;
    font-weight: normal;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 30px;
    }

    p {
      font-size: 18px;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    font-size: 15px;
    margin-bottom: 10px;
  }

  input,
  textarea {
    font-size: 15px;
    font-weight: normal;
    margin-bottom: 20px;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 6px;
    width: 100%;
    box-sizing: border-box;
  }
`;

const SendContacto = styled.button`
  background-color: #c81d25; /* Color rojo */
  color: #fff;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    background-color: #cc0000; /* Color rojo más oscuro al pasar el ratón */
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;