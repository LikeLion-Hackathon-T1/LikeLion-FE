import styled from "styled-components";
import Store from "./Store";
import { useCallback } from "react";
import useSyluvAxios from "hooks/useSyluvAxios";
import { useNavigate } from "react-router-dom";
import { ReactComponent as NoItem } from "assets/images/no-item.svg";
import Button from "components/Common/Button";
import Splash from "components/Common/Splash";

const StoreList = ({ cartList, setCartList, isLoading }) => {
    const syluvAxios = useSyluvAxios();
    const navigate = useNavigate();

    const toggleStoreCheck = useCallback(
        (storeName, isChecked) => {
            setCartList((prevCartList) => {
                return prevCartList.map((item) => {
                    // 현재 스토어의 모든 아이템이 체크되어 있는지 확인
                    const allItemsChecked = prevCartList
                        .filter((i) => i.storeName === storeName)
                        .every((i) => i.isChecked);

                    // 스토어가 체크 해제되는 경우
                    if (!isChecked) {
                        if (allItemsChecked) {
                            // 모든 아이템이 체크되어 있다면 아이템도 함께 체크 해제
                            if (item.storeName === storeName) {
                                return { ...item, isChecked };
                            }
                        } else {
                            // 그렇지 않다면 아이템 상태 유지
                            return item;
                        }
                    } else {
                        // 스토어가 체크되는 경우 아이템 상태 변경
                        if (item.storeName === storeName) {
                            return { ...item, isChecked };
                        }
                    }
                    return item;
                });
            });
        },
        [setCartList]
    );

    const changeCartList = useCallback((cartId, updatedProperties) => {
        if (updatedProperties.quantity === 0) {
            setCartList((prevCartList) =>
                prevCartList.filter((item) => item.cartid !== cartId)
            );
            syluvAxios.delete(`/cart/${cartId}/delete`);
            return;
        }

        setCartList((prevCartList) =>
            prevCartList.map((item) => {
                if (item.cartid === cartId) {
                    return { ...item, ...updatedProperties };
                }
                return item;
            })
        );

        syluvAxios.put(`/cart`, [
            {
                cartId: cartId,
                quantity: updatedProperties.quantity,
            },
        ]);
    }, []);

    if (isLoading) return <Splash />;

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
                        changeCartList={changeCartList}
                        toggleStoreCheck={toggleStoreCheck}
                    />
                ))
            ) : (
                <NoItemContainer>
                    <NoItem />
                    <Button
                        onClick={() => navigate("/")}
                        type="2"
                        text="유도문구 뭐하지"
                    />
                </NoItemContainer>
            )}
            {Object.keys(stores).length > 0 && (
                <OrderButton onClick={() => navigate("/order")}>
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

const NoItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 0 20px;
    gap: 43px;

    height: calc(100dvh - 140px);
`;

export default StoreList;
