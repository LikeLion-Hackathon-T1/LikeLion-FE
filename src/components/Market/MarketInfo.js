import styled from "styled-components";
import { ReactComponent as CallIcon } from "assets/images/call.svg";
import { ReactComponent as AddressIcon } from "assets/images/address.svg";
import { ReactComponent as TimeIcon } from "assets/images/time.svg";

const MarketInfo = ({
    imgSrc = "https://via.placeholder.com/160",
    call = "02-1234-5678",
    address = "서울특별시 종로구 창경궁로 123",
    time = "09:00 ~ 22:30 (일요일 휴무)",
}) => {
    return (
        <Container>
            <MarketImg src={imgSrc} alt="market" />
            <InfoContainer>
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
    margin-top: 20px;
    margin-bottom: 32px;
`;

const MarketImg = styled.img`
    width: 100%;
    height: 144px;
    border-radius: 12px;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Info = styled.div`
    display: flex;
    gap: 4px;
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

export default MarketInfo;
