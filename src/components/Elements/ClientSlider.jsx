import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ClientLogo01 from "../../assets/img/clients/abasterm.png";
import ClientLogo02 from "../../assets/img/clients/ACV.png";
import ClientLogo03 from "../../assets/img/clients/ALFAMETAL.png";
import ClientLogo04 from "../../assets/img/clients/ANWO.png";
import ClientLogo05 from "../../assets/img/clients/Recal.png";
import ClientLogo06 from "../../assets/img/clients/sq energia.png";
import ClientLogo07 from "../../assets/img/clients/Trotter.png";

const ClientSlider = () => {
  const settings = {
    infinite: true,
    speed: 3000,
    slidesToShow: 5,
    autoplay: true,
    cssEase: 'linear',
    arrows: false,
    dots: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    swipe: false,
    touchMove: false,
  };

  return (
    <Slider {...settings}>
      {[ClientLogo01, ClientLogo02, ClientLogo03, ClientLogo04, ClientLogo05, ClientLogo06, ClientLogo07].map((logo, index) => (
        <LogoWrapper key={index}>
          <ImgStyle src={logo} alt="client logo" />
        </LogoWrapper>
      ))}
      {[ClientLogo01, ClientLogo02, ClientLogo03, ClientLogo04, ClientLogo05, ClientLogo06, ClientLogo07].map((logo, index) => (
        <LogoWrapper key={index}>
          <ImgStyle src={logo} alt="client logo" />
        </LogoWrapper>
      ))}
    </Slider>
  );
};

export default ClientSlider;

const LogoWrapper = styled.div`
  width: 100%;
  height: 100px;
  cursor: pointer;
`;

const ImgStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; /* Ajusta según el tamaño y recorte deseado */
  padding: 10px; /* Ajusta el espacio alrededor de la imagen */
`;