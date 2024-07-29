import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "../Nav/Login-SimpleSideBar";
import Backdrop from "../Elements/Backdrop";
import LogoSVG from "../../assets/svg/Logo.svg";
import BurgerIcon from "../../assets/svg/BurgerIcon";

export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setUserName(decodedToken.nombre);
        setUserRole(decodedToken.rol);
      } catch (error) {
        console.log("Error decoding token:", error);
      }
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    closeMenu();
    navigate("/landing");
    window.location.reload();
  };

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper
        className="flexCenter animate whiteBg"
        style={
          y > 100
            ? { height: "60px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }
            : { height: "80px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }
        }
      >
        <NavInner className="container flexSpaceCenter">
          <ScrollLink className="pointer flexNullCenter" to="/landing" smooth={true}>
            <img
              src={LogoSVG}
              alt="Logo"
              style={
                y > 100
                  ? {
                      width: "auto",
                      height: "50px",
                      marginRight: "50px",
                      marginLeft: "20px",
                    }
                  : {
                      width: "auto",
                      height: "70px",
                      marginRight: "15px",
                      marginLeft: "0px",
                    }
              }
            />
          </ScrollLink>
          <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapperRight className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <RouterLink to="/landing" style={{ padding: "10px 30px 10px 0" }}>
                Home
              </RouterLink>
            </li>
            <li className="semiBold font15 pointer">
              <RouterLink
                className="radius8 lightBg"
                style={{ padding: "10px 15px" }}
                onClick={toggleMenu}
              >
                Menu
              </RouterLink>
              {menuOpen && (
                <DropdownMenu>
                  <ul>
                    <li>
                      <RouterLink >
                        Hola, {userName}
                      </RouterLink>
                    </li>
                    {userRole === 0 && (
                    <li>
                      <RouterLink to="/solicitar_cita" onClick={closeMenu}>
                        Solicitar Cita
                      </RouterLink>
                    </li>
                    )}
                    <li>
                      <RouterLink to="/historial" onClick={closeMenu}>
                        Historial
                      </RouterLink>
                    </li>
                    {(userRole === 1 || userRole === 2) && (
                    <li>
                      <RouterLink to="/agenda" onClick={closeMenu}>
                        Agenda
                      </RouterLink>
                    </li>
                    )}
                    <li>
                    <RouterLink to="/configurar_cuenta" onClick={closeMenu}>
                        Configurar Cuenta
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink to="/landing" onClick={handleLogout}>
                        Cerrar Sesión
                      </RouterLink>
                    </li>
                    {userRole === 2 && (
                      <li>
                        <RouterLink to="/panel_admin" onClick={closeMenu}>
                          Administracion
                        </RouterLink>
                      </li>
                    )}
                  </ul>
                </DropdownMenu>
              )}
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

const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: fadeIn 0.3s ease;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f0f0f0;
    }

    a {
      display: block;
      color: #000;
      text-decoration: none;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;