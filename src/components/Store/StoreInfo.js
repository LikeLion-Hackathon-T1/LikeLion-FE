import React from "react";
import styled from "styled-components";
import { ReactComponent as BackIcon } from "assets/images/back.svg";
import headerImage from "assets/images/gimbap.png";
import { ReactComponent as CallIcon } from "assets/images/call.svg";
import { ReactComponent as AddressIcon } from "assets/images/address.svg";
import { ReactComponent as TimeIcon } from "assets/images/time.svg";
import starIcon from "../../assets/images/star.png";
import { useNavigate } from "react-router-dom";

const StoreInfo = ({
  call = "010-3164-1145",
  address = "서울시 마포구 연남동 255-23",
  time = "05:30 ~ 19:30 (일요일 휴무)",
}) => {
  const navigate = useNavigate();

  return (
    <Container>
      <ImageContainer>
        <HeaderImage src={headerImage} alt="Store" />
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon />
        </BackButton>
      </ImageContainer>
      <InfoContainer>
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
          <InfoDetail>{time}</InfoDetail>
        </Info>
      </InfoContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 0px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
  background-color: white;
  box-shadow: none;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0; // 패딩 제거
  margin: 0; // 마진 제거
`;

const HeaderImage = styled.img`
  width: 100%;
  height: auto;
  display: block; // 여백 제거를 위한 블록 설정
  margin: 0; // 여백 제거
`;

const BackButton = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  cursor: pointer;
  padding: 8px;
`;

const InfoContainer = styled.div`
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Info = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
`;

const InfoTitle = styled.div`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.gray800};
`;

const InfoDetail = styled.div`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.color.gray900};
`;

const SubTitle = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray600};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  margin-top: 20px;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-size: 20px;
  margin-top: 0px;
  margin-bottom: 12px;
  font-weight: ${({ theme }) => theme.fontWeight.Bold};
  color: ${({ theme }) => theme.color.gray900};
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Stars = styled.div`
  display: flex;
  align-items: center;

  & img {
    width: 14px;
    height: 14px;
    margin-right: 1px;
  }
`;

const RatingValue = styled.span`
  color: ${({ theme }) => theme.color.gray900};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  font-size: 14px;
  margin-left: 4px;
`;

export default StoreInfo;
