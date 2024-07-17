import styled from "styled-components";

const MarketInfo = ({
    imgSrc = "https://via.placeholder.com/160",
    detail = "",
    businessHours = [""],
    holiday = "",
}) => {
    return (
        <Container>
            <MarketImg src={imgSrc} alt="market" />
            <MarketDescContainer>
                <MarketDetail>{detail}</MarketDetail>
                <div>
                    <SubTitle>영업시간</SubTitle>
                    <Content>
                        {businessHours.map((hour, index) => (
                            <span key={index}>
                                {hour}
                                {index < businessHours.length - 1 && <br />}
                            </span>
                        ))}
                    </Content>
                    <SubTitle>휴무일</SubTitle>
                    <Content>{holiday}</Content>
                </div>
            </MarketDescContainer>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    gap: 16px;
`;

const MarketImg = styled.img`
    width: 160px;
    height: 160px;
`;

const MarketDescContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const MarketDetail = styled.div`
    font-size: 16px;
`;

const SubTitle = styled.h2`
    font-size: 16px;
    font-weight: bold;
    margin: 8px 0;
`;

const Content = styled.div`
    font-size: 12px;
    line-height: 16px;
`;

export default MarketInfo;
