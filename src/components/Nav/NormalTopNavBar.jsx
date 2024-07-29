import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import Sidebar from "../Nav/NormalSideBar";
import Backdrop from "../Elements/Backdrop";
import LogoSVG from "../../assets/svg/Logo.svg";
import BurgerIcon from "../../assets/svg/BurgerIcon";

export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper className="flexCenter animate whiteBg" style={y > 100 ? { height: "60px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" } : { height: "80px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
        <NavInner className="container flexSpaceCenter">
          <ScrollLink className="pointer flexNullCenter" to="/landing" smooth={true}>
            <img src={LogoSVG} alt="Logo" style={y > 100 ? { width: 'auto', height: "50px", marginRight: '50px', marginLeft: '20px' } : { width: 'auto', height: "70px", marginRight: '15px', marginLeft: '0px' }}></img>
          </ScrollLink>
          <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapper className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <ScrollLink activeClass="active animate" style={y > 100 ? { padding: "28px 15px" } : { padding: "38px 15px" }} to="home" spy={true} smooth={true} offset={-80} duration={500}>
                Inicio
              </ScrollLink>
            </li>
            <li className="semiBold font15 pointer">
              <ScrollLink activeClass="active animate" style={y > 100 ? { padding: "28px 15px" } : { padding: "38px 15px" }} to="nosotros" spy={true} smooth={true} offset={-80} duration={500}>
                Nosotros
              </ScrollLink>
            </li>
            <li className="semiBold font15 pointer">
              <ScrollLink activeClass="active animate" style={y > 100 ? { padding: "28px 15px" } : { padding: "38px 15px" }} to="servicios" spy={true} smooth={true} offset={-80} duration={500}>
                Servicios
              </ScrollLink>
            </li>
            <li className="semiBold font15 pointer">
              <ScrollLink activeClass="active animate" style={y > 100 ? { padding: "28px 15px" } : { padding: "38px 15px" }} to="catalogo" spy={true} smooth={true} offset={-80} duration={500}>
                Catálogo
              </ScrollLink>
            </li>
            <li className="semiBold font15 pointer">
              <ScrollLink activeClass="active animate" style={y > 100 ? { padding: "28px 15px" } : { padding: "38px 15px" }} to="contacto" spy={true} smooth={true} offset={-80} duration={500}>
                Contacto
              </ScrollLink>
            </li>
          </UlWrapper>
          <UlWrapperRight className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <RouterLink to="/login" style={{ padding: "10px 30px 10px 0" }}>
                Iniciar sesión
              </RouterLink>
            </li>
            <li className="semiBold font15 pointer flexCenter">
              <RouterLink to="/registro" className="radius8 lightBg" style={{ padding: "10px 15px" }}>
                Registrarme
              </RouterLink>
            </li>
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  transition: height 0.3s ease, box-shadow 0.3s ease;
`;

const NavInner = styled.div`
  position: relative;
  height: 100%;
`;

const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;

const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;

const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;
