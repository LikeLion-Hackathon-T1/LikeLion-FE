import Header from "components/Common/Header";
import DayList from "components/OrderList/DayList";
import styled from "styled-components";
import { ReactComponent as NoItem } from "assets/images/no-item.svg";
import Button from "components/Common/Button";
import { useNavigate } from "react-router-dom";

const OrderListPage = () => {
    const navigate = useNavigate();
    const orderList = null;
    return orderList === null ? (
        <Container>
            <Header title="주문내역" home={"true"} />
            <DayList />
        </Container>
    ) : (
        <>
            <Header title="주문내역" home={"true"} />
            <NoItemContainer>
                <NoItem />
                <Button
                    onClick={() => navigate("/")}
                    type="2"
                    text="유도문구 뭐하지"
                />
            </NoItemContainer>
        </>
    );
};

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

const NoItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 0 20px;
    gap: 43px;

    height: calc(100dvh - 140px);
`;

export default OrderListPage;
