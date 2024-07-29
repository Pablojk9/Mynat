import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CloseIcon from "../../assets/svg/CloseIcon";
import LogoSVG from "../../assets/svg/Logo2.svg";

export default function Sidebar({ sidebarOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setUserRole(decodedToken.rol);
      } catch (error) {
        console.log("Error decoding token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    toggleSidebar(!sidebarOpen);
    navigate("/landing");
    window.location.reload();
  };

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
        <li className="semiBold font15 pointer flexCenter">
          <a href="/landing" className="radius8" style={{ padding: "10px 15px" }}>
            Home
          </a>
        </li>
        {userRole === 0 && (
          <li className="semiBold font15 pointer flexCenter">
            <a href="/solicitar_cita" className="radius8" style={{ padding: "10px 15px" }}>
              Solicitar cita
            </a>
          </li>
        )}
        <li className="semiBold font15 pointer flexCenter">
          <a href="/historial" className="radius8" style={{ padding: "10px 15px" }}>
            Historial
          </a>
        </li>
        {(userRole === 1 || userRole === 2) && (
          <li className="semiBold font15 pointer flexCenter">
            <a href="/agenda" className="radius8" style={{ padding: "10px 15px" }}>
              Agenda
            </a>
          </li>
        )}
        <li className="semiBold font15 pointer flexCenter">
          <a href="/configurar_cuenta" className="radius8" style={{ padding: "10px 15px" }}>
            Configurar Cuenta
          </a>
        </li>
        <li className="semiBold font15 pointer flexCenter">
          <LogoutButton onClick={handleLogout}>
            Cerrar Sesión
          </LogoutButton>
        </li>
        {userRole === 2 && (
          <li className="semiBold font15 pointer flexCenter">
            <a href="/panel_admin" className="radius8" style={{ padding: "10px 15px" }}>
              Administracion
            </a>
          </li>
        )}
      </UlStyle>
    </Wrapper>
  );
}

const LogoutButton = styled.button`
  padding: 10px 15px;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  text-align: left;
  font: inherit;
  display: block;
  width: 100%;
  &:hover {
    background-color: #f0f0f0; // Ajusta el color según tu preferencia
  }
`;

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
