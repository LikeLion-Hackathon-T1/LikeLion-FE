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
