import styled from "styled-components";
import useCartStore from "hooks/useCartStore";
import Store from "./Store";

const StoreList = () => {
    const { carts } = useCartStore();
    const storeNames = Object.keys(carts);

    const totalPrice = storeNames.reduce((total, storeName) => {
        const storeCart = carts[storeName];
        return (
            total +
            storeCart.reduce(
                (storeTotal, item) => storeTotal + item.price * item.count,
                0
            )
        );
    }, 0);
    return (
        <CartList>
            {storeNames.length > 0 ? (
                storeNames.map((storeName) => <Store name={storeName} />)
            ) : (
                <NoItem>장바구니에 등록된 물품이 없습니다.</NoItem>
            )}
            {storeNames.length > 0 && (
                <OrderButton>
                    {new Intl.NumberFormat("ko-KR").format(totalPrice)}원
                    주문하기
                </OrderButton>
            )}
        </CartList>
    );
};
const CartList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto;
    max-height: 85%;
`;

const NoItem = styled.div`
    font-size: 20px;
    text-align: center;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    padding: 20px;
`;

const OrderButton = styled.button`
    font-size: 16px;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    position: absolute;
    bottom: 15px;
    width: 440px;
`;

export default StoreList;
