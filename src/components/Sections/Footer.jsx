import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import LogoSVG from "../../assets/svg/Logo2.svg";
import Facebook from "../../assets/img/facebook.png";
import Linkedin from "../../assets/img/linkedin.png";
import Youtube from "../../assets/img/youtube.png";
import Instagram from "../../assets/img/instagram.png";
import FooterIMG from "../../assets/img/Footer.jpg";

const Footer = () => {
    const [informacion, setInformacion] = useState({
        numeroTelefono: '',
        numeroWhatsapp: '',
        correo: ''
    });

    useEffect(() => {
        async function fetchInformacion() {
            try {
                const response = await fetch('http://localhost:5500/api/informacion/1');
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText);
                }
                const informacion = await response.json();
                setInformacion({
                    numeroTelefono: informacion.numero_telefono,
                    numeroWhatsapp: informacion.numero_whatsapp,
                    correo: informacion.correo
                    
                });
            } catch (error) {
                console.error('Error al obtener la información: ', error);
            }
        }
        fetchInformacion();
    }, []);

    return (
        <FooterWrapper style={{ backgroundImage: `url(${FooterIMG})` }}>
            <FooterContent>
                <LogoBox>
                    <img src={LogoSVG} alt="MYNAT Chile" />
                </LogoBox>
                <ContactInfo>
                    <h4>Contáctanos</h4>
                    <ul>
                        <li>
                            <FontAwesomeIcon icon={faPhone} className="icon" />
                            {`+56 ${informacion.numeroTelefono}`}
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faWhatsapp} className="icon" />
                            {`+56 ${informacion.numeroWhatsapp}`}
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faEnvelope} className="icon" />
                            {informacion.correo}
                        </li>
                    </ul>
                </ContactInfo>
                <SocialLinks>
                    <a href="https://www.facebook.com" className="social-icon">
                        <img src={Facebook} alt="Facebook" />
                    </a>
                    <a href="https://cl.linkedin.com/in/mynat-chile-spa-4b6575215" className="social-icon">
                        <img src={Linkedin} alt="LinkedIn" />
                    </a>
                    <a href="https://www.youtube.com" className="social-icon">
                        <img src={Youtube} alt="YouTube" />
                    </a>
                    <a href="https://www.instagram.com/mynat_chile_spa" className="social-icon">
                        <img src={Instagram} alt="Instagram" />
                    </a>
                </SocialLinks>
            </FooterContent>
        </FooterWrapper>
    );
};

const FooterWrapper = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    padding: 50px 20px; /* Ajusta el padding según sea necesario */
`;

const FooterContent = styled.div`
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    color: white;
    text-align: center;

    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
    }
`;

const LogoBox = styled.div`
    width: 150px;
    img {
        width: 100%;
        height: auto;
    }

    @media (max-width: 768px) {
        margin-bottom: 20px;
    }
`;

const ContactInfo = styled.div`
    ul {
        list-style: none;
        padding: 0;
    }

    li {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .icon {
        margin-right: 10px;
    }
`;

const SocialLinks = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    img {
        max-width: 35px;
        height: auto;
        font-size: 24px;
        text-decoration: none;
        color: #333;
    }

    @media (max-width: 768px) {
        margin-top: 20px;
    }
`;

export default Footer;