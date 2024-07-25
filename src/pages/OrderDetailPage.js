import Button from "components/Common/Button";
import Header from "components/Common/Header";
import AmountList from "components/Order/OrderDetail/AmoutList";
import MenuList from "components/Order/OrderDetail/MenuList";
import SimpleReceipt from "components/Order/OrderDetail/SimpleReceipt";
import styled from "styled-components";

const OrderDetailPage = () => {
    return (
        <Container>
            <Header title="주문상세" home={"true"} backSrc={"/order"} />
            <SimpleReceipt />
            <MenuList />
            <AmountList />
            <ButtonSpace />
            <ButtonContainer>
                <Button text="주문 내역 삭제" type="1" />
                <Button text="리뷰 남기기" type="2" />
            </ButtonContainer>
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

    position: relative;
`;

export const GraySpace = styled.div`
    background-color: ${({ theme }) => theme.color.gray100};
    width: 100%;
    height: 6px;
`;

export const ListContainer = styled.div`
    margin-top: 6px;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 22px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: calc(100% - 68px);
    gap: 17px;
    position: absolute;
    bottom: 32px;
`;

const ButtonSpace = styled.div`
    height: 48px;
    margin-bottom: 32px;
`;
