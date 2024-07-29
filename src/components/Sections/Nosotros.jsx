import React from "react";
import styled from "styled-components";

import ClientSlider from "../Elements/ClientSlider";
import ImagenSN from "../../assets/img/SN.png";

export default function Nosotros() {
  return (
    <Wrapper id="nosotros">
      <div className="hero-body" style={{ marginTop: '0px' }}>
      <div className="container has-text-centered">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <HeaderInfo>
                <h1 className="font40 extraBold">Sobre Nosotros</h1>
                <p className="font16">
                  Nuestra empresa se dedica a dar múltiples soluciones en el Área de Ingeniería Térmica y Mantenimiento de Sistemas Críticos, asegurando la operatividad de sus equipos para obtener el mayor desempeño en sus procesos de producción y de soporte operacional, en cuanto a líneas de alimentación y producción de calor, agua caliente y vapor se refieren.
                  <br /><br />
                  Nos destacamos por contar con una amplia gama de soluciones en sus necesidades de climatización de ambientes y de salas con requerimientos especiales de refrigeración.
                  <br /><br />
                  Todo nuestro personal se destaca en su preparación y experiencia, las que están puestas a su disposición para generar en conjunto soluciones que permitan alcanzar el máximo de su rendimiento productivo, a un costo razonable y conveniente que satisfaga en tiempo y oportunidad sus necesidades y las de sus clientes.
                </p>
              </HeaderInfo>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <ContactImgBox>
                <img src={ImagenSN} alt="Imagen de contacto" className="radius6" style={{ maxWidth: "100%", height: "400px" }} />
              </ContactImgBox>
            </div>
          </div>
        </div>
      </div>
      <div className="lightBg" style={{ padding: "50px 0" }}>
        <div className="container">
          <h1 className="font40 Bold">Confían en nosotros</h1>
          <ClientSlider />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;

const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;

const ContactImgBox = styled.div`
  max-width: 100%;
  align-self: flex-end;
  margin: 10px 0 10px 30px; /* Ajusta el margen según sea necesario */
`;