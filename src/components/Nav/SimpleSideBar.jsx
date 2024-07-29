import React from "react";
import styled from "styled-components";

import CloseIcon from "../../assets/svg/CloseIcon";
import LogoSVG from "../../assets/svg/Logo2.svg";

export default function Sidebar({ sidebarOpen, toggleSidebar }) {
  return (
    <Wrapper className="animate darkBg" sidebarOpen={sidebarOpen}>
      <SidebarHeader className="flexSpaceCenter">
      <div className="flexNullCenter">
        <img src={LogoSVG} alt="Logo" style={{ width: 'auto', height: '50px', marginRight: '15px' }} />
      </div>
      <CloseBtn onClick={() => toggleSidebar(!sidebarOpen)} className="animate pointer">
        <CloseIcon />
      </CloseBtn>
    </SidebarHeader>

      <UlStyle className="flexNullCenter flexColumn">
        <li className="semiBold font15 pointer">
        <a href="/landing" style={{ padding: "10px 30px 10px 0" }} className="whiteColor">
            Home
          </a>
        </li>
      </UlStyle>
      <UlStyle className="flexSpaceCenter">
        <li className="semiBold font15 pointer">
          <a href="/login" style={{ padding: "10px 30px 10px 0" }} className="whiteColor">
            Iniciar sesión
          </a>
        </li>
        <li className="semiBold font15 pointer flexCenter">
          <a href="/registro" className="radius8 lightBg" style={{ padding: "10px 15px" }}>
            Registrarme
          </a>
        </li>
      </UlStyle>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  padding: 0 30px;
  right: ${(props) => (props.sidebarOpen ? "0px" : "-400px")};
  z-index: 9999;
  @media (max-width: 400px) {
    width: 100%;
  }
`;
const SidebarHeader = styled.div`
  padding: 20px 0;
`;
const CloseBtn = styled.button`
  border: 0px;
  outline: none;
  background-color: transparent;
  padding: 10px;
`;
const UlStyle = styled.ul`
  padding: 40px;
  li {
    margin: 20px 0;
  }
`;
