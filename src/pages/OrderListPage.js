import Header from "components/Common/Header";
import styled from "styled-components";
import { ReactComponent as NoItem } from "assets/images/no-item.svg";
import Button from "components/Common/Button";
import { useNavigate } from "react-router-dom";
import OrderItem from "components/OrderList/OrderItem";
import TabBar from "components/Common/TabBar";

const OrderListPage = () => {
    const navigate = useNavigate();
    const orderList = null;
    return orderList !== null ? (
        <>
            <Header title="주문내역" />
            <NoItemContainer>
                <NoItem />
                <Button
                    onClick={() => navigate("/")}
                    type="2"
                    text="유도문구 뭐하지"
                />
            </NoItemContainer>
            <TabBar activeTab={"orderlist"} />
        </>
    ) : (
        <>
            <Header title="주문내역" />
            <OrderList>
                <OrderItem />
                <OrderItem />
            </OrderList>
            <TabBar activeTab={"orderlist"} />
        </>
    );
};

const OrderList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    background-color: ${({ theme }) => theme.color.gray100};
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
