import MarketList from "./MarketList";

const { default: styled } = require("styled-components");

const DayList = () => {
    return (
        <DayContainer>
            <GraySpace />
            <Date>2024. 07. 22</Date>
            <MarketList />
        </DayContainer>
    );
};

export default DayList;

const GraySpace = styled.div`
    background-color: ${({ theme }) => theme.color.gray100};
    width: 100%;
    height: 6px;
`;

const DayContainer = styled.div`
    margin-top: 6px;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 22px;
`;

const Date = styled.div`
    font-size: 18px;
    color: ${({ theme }) => theme.color.gray900};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    padding: 15px 20px 10px 20px;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
    margin-bottom: 8px;
`;
