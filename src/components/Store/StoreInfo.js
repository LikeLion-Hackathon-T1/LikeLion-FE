import React from "react";
import styled from "styled-components";
import { ReactComponent as CallIcon } from "assets/images/call.svg";
import { ReactComponent as AddressIcon } from "assets/images/address.svg";
import { ReactComponent as TimeIcon } from "assets/images/time.svg";
import starIcon from "../../assets/images/star.png";

const StoreInfo = ({
  call = "010-3164-1145",
  address = "서울시 마포구 연남동 255-23",
  time = "05:30 ~ 19:30 (일요일 휴무)",
}) => {
  return (
    <Container>
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
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
  background-color: white;
  box-shadow: none;
`;

const InfoContainer = styled.div`
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
