import { GraySpace, ListContainer } from "pages/OrderDetailPage";
import styled from "styled-components";

const SimpleReceipt = () => {
    return (
        <ListContainer>
            <GraySpace />
            <State>배달이 완료되었어요</State>
            <StoreContainer>
                <MarketName>광장시장</MarketName>
                <StoreItem>
                    <StoreName>세미수산</StoreName>
                </StoreItem>
                <StoreItem>
                    <StoreMenu>광어 모듬회 세트 외 3</StoreMenu>
                    <StorePrice>61,000원</StorePrice>
                </StoreItem>
                <OrderInfo>
                    <OrderItem>주문일시: 2024년 7월 17일 오후 08:12</OrderItem>
                    <OrderItem>주문번호: B1UD01004L</OrderItem>
                </OrderInfo>
            </StoreContainer>
        </ListContainer>
    );
};

export default SimpleReceipt;

const State = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.color.primary};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    padding: 16px 20px 13px 20px;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
    margin-bottom: 8px;
`;

const MarketName = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray500};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    margin-bottom: 11px;
`;

const StoreContainer = styled.div`
    padding: 0 20px;
    display: flex;
    flex-direction: column;
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

const OrderInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const OrderItem = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray500};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    margin-top: 13px;
`;
