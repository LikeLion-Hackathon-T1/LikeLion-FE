import React from "react";
import styled from "styled-components";
import phoneIcon from "../../assets/images/phonecall.png";
import addressIcon from "../../assets/images/address.png";
import timeIcon from "../../assets/images/time.png";
import starIcon from "../../assets/images/star.png";

const StoreInfoWrapper = styled.div`
  padding: 20px;
  background-color: white;
  position: relative;
  top: -20px;
  z-index: 1;
  margin-bottom: 0px;
  box-shadow: none;
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin: 0;
  font-weight: bold;
  font-family: "Pretendard-Bold", sans-serif;
`;

const SubTitle = styled.h2`
  font-size: 1em;
  color: #888;
  margin: 5px 0;
  font-family: "Pretendard", sans-serif;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const Stars = styled.div`
  display: flex;
  align-items: center;

  & img {
    width: 20px;
    height: 20px;
    margin-right: 2px;
  }
`;

const RatingValue = styled.span`
  color: #888;
  font-size: 0.9em;
  margin-left: 5px;
`;

const Info = styled.p`
  margin: 5px 0;
  color: #888;
  font-size: 0.9em;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    background-size: cover;
  }
`;

const PhoneNumber = styled(Info)`
  &::before {
    background-image: url(${phoneIcon});
  }
`;

const Address = styled(Info)`
  &::before {
    background-image: url(${addressIcon});
  }
`;

const Hours = styled(Info)`
  &::before {
    background-image: url(${timeIcon});
  }
`;

const StoreInfo = () => (
  <StoreInfoWrapper>
    <SubTitle>분식</SubTitle>
    <Title>원조 누드치즈김밥</Title>
    <Rating>
      <Stars>
        {Array(5)
          .fill()
          .map((_, i) => (
            <img key={i} src={starIcon} alt="star" />
          ))}
      </Stars>
      <RatingValue>4.2</RatingValue>
    </Rating>
    <PhoneNumber>010-3164-1145</PhoneNumber>
    <Address>서울시 마포구 연남동 255-23</Address>
    <Hours>05:30 ~ 19:30 (일요일 휴무)</Hours>
  </StoreInfoWrapper>
);

export default StoreInfo;
