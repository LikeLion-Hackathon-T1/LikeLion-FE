import Header from "components/Common/Header";
import styled from "styled-components";
import { ReactComponent as NoItem } from "assets/images/no-item.svg";
import Button from "components/Common/Button";
import { useNavigate } from "react-router-dom";
import OrderItem from "components/OrderList/OrderItem";
import TabBar from "components/Common/TabBar";
import useSyluvAxios from "hooks/useSyluvAxios";
import { useEffect, useState } from "react";
import Splash from "components/Common/Splash";

const OrderListPage = () => {
    const navigate = useNavigate();
    const syluvAxios = useSyluvAxios();
    const [orderList, setOrderList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getOrderList = async () => {
            try {
                const res = await syluvAxios.get("/order");
                setOrderList(res.data.payload);
                setIsLoading(false);
                console.log(res.data.payload);
            } catch (error) {
                console.error(error);
            }
        };
        getOrderList();
    }, []);

    if (isLoading) {
        return <Splash />;
    }

    return orderList === null ? (
        <>
            <Header title="주문내역" />
            <NoItemContainer>
                <NoItem />
                <Button
                    onClick={() => navigate("/")}
                    type="2"
                    text="시장 둘러보기"
                />
            </NoItemContainer>
            <TabBar activeTab={"orderlist"} />
        </>
    ) : (
        <>
            <Header title="주문내역" back={false} />
            <OrderList>
                {Object.keys(orderList).map((key) =>
                    orderList[key].map((order) => (
                        <OrderItem key={order.createdTime} order={order} />
                    ))
                )}
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
