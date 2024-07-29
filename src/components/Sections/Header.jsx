import React from "react";
import styled from "styled-components";
import ControlledCarousel from "../Elements/ControlledCarousel";

export default function Header() {
  return (
    <div style={{ marginTop: '80px'}}>
    <Wrapper id="home">
      <ControlledCarousel />
    </Wrapper>
    </div>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;