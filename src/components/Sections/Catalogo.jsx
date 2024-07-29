import React from "react";
import styled from "styled-components";

import ProjectBox from "../Elements/ProjectBox";
import TodoCatalogo from "../Elements/TodoCatalogo";

import ProjectImg1 from "../../assets/img/catalogo/1.jpg";
import ProjectImg2 from "../../assets/img/catalogo/2.jpg";
import ProjectImg3 from "../../assets/img/catalogo/3.jpg";
import ProjectImg4 from "../../assets/img/catalogo/4.jpg";
import ProjectImg5 from "../../assets/img/catalogo/5.jpg";
import ProjectImg6 from "../../assets/img/catalogo/6.jpg";

export default function Catalogo() {
  return (
    <Wrapper id="catalogo">
      <div className="lightBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Nuestro catálogo</h1>
          </HeaderInfo>
          <div className="row textCenter">
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <TodoCatalogo
                img={ProjectImg1}
                title="Catálogo competo"
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <ProjectBox
                img={ProjectImg2}
                title="Generadores eléctricos"
                tipoProducto={2}
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <ProjectBox
                img={ProjectImg3}
                title="Bombas hidráulicas"
                tipoProducto={3}
              />
            </div>
          </div>
          <div className="row textCenter">
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <ProjectBox
                img={ProjectImg4}
                title="Calderas industriales"
                tipoProducto={4}
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <ProjectBox
                img={ProjectImg5}
                title="Calderas para edificios"
                tipoProducto={5}
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <ProjectBox
                img={ProjectImg6}
                title="Calderas domiciliarias"
                tipoProducto={6}
              />
            </div>
          </div>
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