import styled from "styled-components";
import StoreList from "./StoreList";

const MarketList = () => {
    return (
        <DayMarketContainer>
            <MarketContainer>
                <MarketName>광장시장</MarketName>
                <StoreList />
            </MarketContainer>
        </DayMarketContainer>
    );
};

export default MarketList;

const DayMarketContainer = styled.div`
    padding: 0px 20px;
    display: flex;
    flex-direction: column;
    gap: 43px;
`;

const MarketContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const MarketName = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray500};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
