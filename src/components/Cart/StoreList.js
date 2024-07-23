// StoreList.js
import styled from "styled-components";
import Store from "./Store";
import useSyluvAxios from "hooks/useSyluvAxios";
import { useEffect, useState } from "react";

const StoreList = () => {
    const syluvAxios = useSyluvAxios();
    const [cartList, setCartList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getCart = async () => {
            await syluvAxios
                .get("/cart")
                .then((res) => {
                    setCartList(res.data.payload);
                    console.log(res.data.payload);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getCart();
    }, []);

    if (isLoading) return <div></div>;

    const stores = cartList.reduce((acc, item) => {
        acc[item.storeName] = acc[item.storeName] || [];
        acc[item.storeName].push(item);
        return acc;
    }, {});

    const totalAmount = cartList.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <CartList>
            {Object.keys(stores).length > 0 ? (
                Object.keys(stores).map((storeName) => (
                    <Store
                        key={storeName}
                        name={storeName}
                        items={stores[storeName]}
                    />
                ))
            ) : (
                <NoItem>장바구니에 등록된 물품이 없습니다.</NoItem>
            )}
            {Object.keys(stores).length > 0 && (
                <OrderButton>
                    {new Intl.NumberFormat("ko-KR").format(totalAmount)}원
                    주문하기
                </OrderButton>
            )}
        </CartList>
    );
};

const CartList = styled.div`
    margin-top: 7px;
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 72px;
`;

const NoItem = styled.div`
    font-size: 20px;
    text-align: center;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 20px;
    margin: 0px 20px;
`;

const OrderButton = styled.button`
    position: fixed;
    bottom: 12px;
    width: 440px;
    height: 48px;
    margin: 0px 20px;
    background-color: ${({ theme }) => theme.color.primary};
    color: white;
    font-size: 16px;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    border: none;
    border-radius: 8px;
    cursor: pointer;

    @media (max-width: 480px) {
        width: calc(100% - 40px);
    }
`;

export default StoreList;
