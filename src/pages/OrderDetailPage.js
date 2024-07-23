import Header from "components/Common/Header";
import styled from "styled-components";

const OrderDetailPage = () => {
    return (
        <Container>
            <Header title="주문상세" home={"true"} backSrc={"/order"} />
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
                        <OrderItem>
                            주문일시: 2024년 7월 17일 오후 08:12
                        </OrderItem>
                        <OrderItem>주문번호: B1UD01004L</OrderItem>
                    </OrderInfo>
                </StoreContainer>
            </ListContainer>
            <ListContainer>
                <GraySpace />
                <div>
                    <div>
                        <span>광어 모듬회 세트 1개</span>
                        <span>30,000원</span>
                    </div>
                    <div>
                        <span>우럭매운탕 1개</span>
                        <span>30,000원</span>
                    </div>
                </div>
            </ListContainer>
            <ListContainer>
                <GraySpace />
                <div>
                    <div>
                        <span>결제금액</span>
                        <span>1000원</span>
                    </div>
                    <div>
                        <span>주문금액</span>
                        <span>1000원</span>
                    </div>
                </div>
            </ListContainer>
        </Container>
    );
};

export default OrderDetailPage;

const Container = styled.div`
    display: flex;
    min-height: 100dvh;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; // IE 및 Edge
    scrollbar-width: none; // Firefox
`;

const GraySpace = styled.div`
    background-color: ${({ theme }) => theme.color.gray100};
    width: 100%;
    height: 6px;
`;

const ListContainer = styled.div`
    margin-top: 6px;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 22px;
`;

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
    cursor: pointer;
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
