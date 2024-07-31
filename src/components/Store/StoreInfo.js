import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as CallIcon } from "assets/images/call.svg";
import { ReactComponent as AddressIcon } from "assets/images/address.svg";
import { ReactComponent as TimeIcon } from "assets/images/time.svg";
import { ReactComponent as BackIcon } from "assets/images/back.svg";
import { ReactComponent as CartIcon } from "assets/images/marketbag.svg";
import { ReactComponent as HomeIcon } from "assets/images/newhome.svg";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StoreInfo = ({
  name,
  category,
  call,
  address,
  openHours,
  closeHours,
  ratingAvg,
  storeImage,
}) => {
  const navigate = useNavigate();
  const images = [storeImage];
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setCurrentSlide(index),
  };

  // 별과 빈 별의 갯수 계산
  const ratingToPercent = (ratingAvg) => {
    const score = ratingAvg * 20;
    return score + 1.5;
  };

  return (
    <Container>
      <ImageContainer>
        <Slider {...settings}>
          {images.map((image, index) => (
            <HeaderImage key={index} src={image} alt={`Store-${index}`} />
          ))}
        </Slider>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon />
        </BackButton>
        <HomeButton onClick={() => navigate("/")}>
          <HomeIcon />
        </HomeButton>
        <CartButton onClick={() => navigate("/")}>
          <CartIcon />
        </CartButton>
        {images.length > 1 && (
          <ImageCounter>
            {currentSlide + 1} / {images.length}
          </ImageCounter>
        )}
      </ImageContainer>
      <InfoContainer>
        <SubTitle>{category}</SubTitle>
        <Title>{name}</Title>
        <Rating>
          <StarRatings>
            <StarRatingsFill
              style={{ width: `${ratingToPercent(ratingAvg)}%` }}
            >
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </StarRatingsFill>
            <StarRatingsBase>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </StarRatingsBase>
          </StarRatings>
          <RatingValue>{ratingAvg.toFixed(1)}</RatingValue>
        </Rating>
        <Info>
          <CallIcon />
          <InfoTitle>전화번호</InfoTitle>
          <InfoDetail>{call}</InfoDetail>
        </Info>
        <Info>
          <AddressIcon />
          <InfoTitle>주소</InfoTitle>
          <InfoDetail>{address}</InfoDetail>
        </Info>
        <Info>
          <TimeIcon />
          <InfoTitle>영업시간</InfoTitle>
          <InfoDetail>{`${openHours} ~ ${closeHours}`}</InfoDetail>
        </Info>
      </InfoContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: none;
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0;
  margin: 0;
`;

const HeaderImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  margin: 0;
  height: 272px;
`;

const BackButton = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  cursor: pointer;
  padding: 8px;
`;

const HomeButton = styled.div`
  position: absolute;
  top: 16px;
  right: calc(20px + 32px + 12px);
  cursor: pointer;
  padding: 8px;
`;

const CartButton = styled.div`
  position: absolute;
  top: 16px;
  right: 20px;
  cursor: pointer;
  padding: 8px;
`;

const ImageCounter = styled.div`
  position: absolute;
  bottom: 16px;
  right: 24px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 4px 8px;
  border-radius: 31px;
  font-size: 12px;
  width: 52px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const InfoContainer = styled.div`
  margin: 20px 20px 0 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Info = styled.div`
  display: flex;
  gap: 4px; /* 4px 간격 */
  align-items: center;
`;

const InfoTitle = styled.div`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.gray800};
`;

const InfoDetail = styled.div`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.color.gray500};
`;

const SubTitle = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray600};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const Title = styled.h1`
  font-size: 20px;
  margin-top: 8px;
  margin-bottom: 12px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.gray900};
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const StarRatings = styled.div`
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  color: gold; /* 별의 색상 지정 */
  font-size: 14px; /* 별의 크기 조정 */
`;

const StarRatingsFill = styled.div`
  color: #fff58c;
  position: absolute;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
  -webkit-text-fill-color: gold;
`;

const StarRatingsBase = styled.div`
  color: #cccccc;
  z-index: 0;
  display: flex;
`;

const RatingValue = styled.span`
  color: ${({ theme }) => theme.color.gray900};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  font-size: 14px;
  margin-left: 4px;
`;

export default StoreInfo;
