import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  text-align: left;
  padding: 20px 30px;
  margin-top: 30px;
`;

const OfferList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const OfferItem = styled.div`
  flex: 1 0 80%;
  text-align: center;
`;

const OfferLink = styled.a`
  display: inline-block;
  padding: 10px;
  color: #fff;
  background-color: #c81d25;
  text-decoration: none;
  transition: background-color 0.3s ease;
  border-radius: 8px;
  font-size: 18px;
  font-weight: normal;
  margin-bottom: 10px;
  width: 300px; /* Cambiamos el ancho a automático */
  max-width: 300px; /* Establecemos un máximo de ancho para controlar el tamaño del botón */
  text-align: center; /* Centramos el texto dentro del botón */
  box-sizing: border-box;

  &:hover {
    background-color: #d60000;
  }
`;

const Servicios = () => {
  const [informacion, setInformacion] = useState({ numeroWhatsapp: "" });

  useEffect(() => {
    async function fetchInformacion() {
      try {
        const response = await fetch("http://localhost:5500/api/informacion/1");
        if (!response.ok) {
          throw new Error("Error al obtener la información");
        }
        const informacion = await response.json();
        setInformacion({ numeroWhatsapp: informacion.numero_whatsapp });
      } catch (error) {
        console.error("Error al obtener la información: ", error);
      }
    }
    fetchInformacion();
  }, []);

  const buildWhatsAppMessageURL = (message) => {
    const phoneNumber = informacion.numeroWhatsapp;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/56${phoneNumber}/?text=${encodedMessage}`;
  };

  const generateWhatsAppMessage = (categoria, servicio) => {
    let message = `Hola, estoy interesad@ en la ${categoria.toLowerCase()} de ${servicio.toLowerCase()}`;
    return message;
  };

  const servicios = {
    Instalación: [
      "Ingeniería térmica",
      "Generadores eléctricos",
      "Bombas hidráulicas",
      "Calderas Industriales",
      "Calderas de edificios",
      "Calderas domiciliarias",
    ],
    Mantención: [
      "Ingeniería térmica",
      "Generadores eléctricos",
      "Bombas hidráulicas",
      "Calderas Industriales",
      "Calderas de edificios",
      "Calderas domiciliarias",
    ],
  };

  return (
    <Wrapper id="servicios">
      <div className="whiteBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Lista de servicios</h1>
            <p className="font20">
              Entre nuestras múltiples posibilidades de apoyo a su labor, estos son algunos de los servicios con los que contamos para su soporte y tranquilidad, con la convicción de que podemos convertirnos en un más que confiable aliado estratégico para sus objetivos.
            </p>
          </HeaderInfo>
          <TablesWrapper className="flexSpaceCenter">
            <TableBox>
              <div className="lightBg radius8 shadow" style={{ margin: "10px 0", padding: "20px" }}>
                <h4 className="font30 Bold">Instalación</h4>
                <p className="font16">Contamos con la capacitación necesaria para aplicar los siguientes servicios de instalación:</p>
                <OfferList>
                  {servicios.Instalación.map((servicio, index) => (
                    <OfferItem key={index}>
                      <OfferLink
                        href={buildWhatsAppMessageURL(generateWhatsAppMessage("Instalación", servicio))}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {servicio}
                      </OfferLink>
                    </OfferItem>
                  ))}
                </OfferList>
              </div>
            </TableBox>
            <TableBox>
              <div className="lightBg radius8 shadow" style={{ margin: "10px 0", padding: "20px" }}>
                <h4 className="font30 Bold">Mantención</h4>
                <p className="font16">Contamos con la capacitación necesaria para aplicar los siguientes servicios de mantención:</p>
                <OfferList>
                  {servicios.Mantención.map((servicio, index) => (
                    <OfferItem key={index}>
                      <OfferLink
                        href={buildWhatsAppMessageURL(generateWhatsAppMessage("Mantención", servicio))}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {servicio}
                      </OfferLink>
                    </OfferItem>
                  ))}
                </OfferList>
              </div>
            </TableBox>
          </TablesWrapper>
        </div>
      </div>
    </Wrapper>
  );
};

export default Servicios;

const HeaderInfo = styled.div`
  margin-bottom: 50px;
  @media (max-width: 860px) {
    text-align: center;
  }

  h1 {
    font-size: 40px;
    font-weight: 800;
  }

  p {
    font-size: 20px;
  }

  @media (max-width: 860px) {
    h1 {
      font-size: 30px;
    }

    p {
      font-size: 18px;
    }
  }
`;

const TablesWrapper = styled.div`
  display: flex;
  justify-content: space-around; /* Alinea las tablas horizontalmente */
  flex-wrap: wrap;
  gap: 30px; /* Añade espacio entre las tablas */

  @media (max-width: 860px) {
    flex-direction: column;
    align-items: center; /* Centra las tablas verticalmente en pantallas pequeñas */
  }
`;

const TableBox = styled.div`
  width: 45%;
  @media (max-width: 860px) {
    width: 100%;
    max-width: 370px;
    margin-bottom: 30px; /* Añade espacio entre las tablas en dispositivos móviles */
  }
`;