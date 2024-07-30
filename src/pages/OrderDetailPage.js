import Button from "components/Common/Button";
import Header from "components/Common/Header";
import MenuList from "components/OrderList/OrderDetail/MenuList";
import SimpleReceipt from "components/OrderList/OrderDetail/SimpleReceipt";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const OrderDetailPage = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();
    return (
        <Container>
            <Header title="주문상세" />
            <SimpleReceipt />
            <MenuList />
            <ButtonContainer>
                <Button
                    text="리뷰 남기기"
                    type="2"
                    onClick={() => {
                        navigate("/review/" + orderId);
                    }}
                />
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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: calc(100% - 30px);
    gap: 17px;
    position: absolute;
    bottom: 32px;
`;
