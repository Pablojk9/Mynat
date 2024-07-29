import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function TodoCatalogo({ img, title }) {
  return (
    <Wrapper>
      <Link to={`/catalogo_completo`}>
        <ImgBtn className="animate pointer">
          <img className="radius8" src={img} alt="project" />
        </ImgBtn>
      </Link>
      <h3 className="font20 extraBold">{title}</h3>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  text-align: center;

  img {
    width: 100%;
    height: auto;
    margin: 20px 0;
    transition: opacity 0.3s ease;
  }

  h3 {
    padding-bottom: 10px;
  }
`;

const ImgBtn = styled.button`
  background-color: transparent;
  border: 0;
  outline: none;
  padding: 0;
  margin: 0;
  position: relative;

  &:hover img {
    opacity: 0.7;
  }
`;