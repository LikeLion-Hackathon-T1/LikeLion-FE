import styled from "styled-components";

const StoreList = () => {
    return (
        <StoreContainer>
            <StoreItem>
                <StoreName>세미수산</StoreName>
                <StoreStatus>픽업완료</StoreStatus>
            </StoreItem>
            <StoreItem>
                <StoreMenu>광어 모듬회 세트 외 3</StoreMenu>
                <StorePrice>61,000원</StorePrice>
            </StoreItem>
        </StoreContainer>
    );
};

export default StoreList;

const StoreContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 21px;
    gap: 10px;
`;

const StoreItem = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StoreName = styled.div`
    font-size: 18px;
    color: ${({ theme }) => theme.color.gray900};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const StoreStatus = styled.div`
    font-size: 12px;
    color: ${({ theme }) => theme.color.gray500};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const StoreMenu = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray500};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const StorePrice = styled.div`
    font-size: 18px;
    color: ${({ theme }) => theme.color.gray900};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;
