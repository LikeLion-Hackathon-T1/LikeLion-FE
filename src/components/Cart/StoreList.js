import styled from "styled-components";
import Store from "./Store";
import { useCallback, useState } from "react";
import useSyluvAxios from "hooks/useSyluvAxios";
import { useNavigate } from "react-router-dom";
import noItem from "assets/images/no-cart.png";
import Splash from "components/Common/Splash";
import Toast from "components/Common/Toast";
import OrderPage from "pages/OrderPage";

const StoreList = ({ cartList, setCartList, isLoading }) => {
    const syluvAxios = useSyluvAxios();
    const navigate = useNavigate();
    const [selectedStore, setSelectedStore] = useState(null);
    const [toastMessage, setToastMessage] = useState("");
    const [openBill, setOpenBill] = useState(false);

    const handleBillClose = useCallback(() => {
        setOpenBill(false);
    }, []);

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

            // 체크된 스토어 업데이트
            setSelectedStore(isChecked ? storeName : null);
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

    const selectedItems = cartList.filter((item) => item.isChecked);
    const totalAmount = selectedItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const handleOrder = () => {
        const selectedStores = [
            ...new Set(selectedItems.map((item) => item.storeName)),
        ];
        console.log(selectedStores);
        if (selectedStores.length > 1) {
            setToastMessage("한 번에 한 가게만 주문할 수 있어요");
        } else {
            setOpenBill(true);
        }
    };

    const closeToast = () => {
        setToastMessage("");
    };

    if (openBill) {
        return <OrderPage item={selectedItems} onClick={handleBillClose} />;
    }

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
                    <span className="title-text">장바구니가 비어있어요</span>
                    <img src={noItem} alt="no-item" width={158} height={158} />
                    <span className="sub-text">
                        시장을 구경하고
                        <br />
                        장바구니를 채워주세요
                    </span>
                </NoItemContainer>
            )}
            <ButtonContainer>
                <OrderButton onClick={handleOrder} disabled={totalAmount === 0}>
                    {totalAmount > 0
                        ? `${new Intl.NumberFormat("ko-KR").format(
                              totalAmount
                          )}원 `
                        : null}
                    주문하기
                </OrderButton>
            </ButtonContainer>
            {toastMessage && (
                <Toast
                    message={toastMessage}
                    message2="먼저 주문할 가게만 선택해주세요"
                    onClose={closeToast}
                />
            )}
        </CartList>
    );
};

const ButtonContainer = styled.div`
    position: fixed;
    bottom: 0px;
    padding: 20px 0px;
    background-color: white;
    border-top: 1px solid ${({ theme }) => theme.color.gray100};
`;

const OrderButton = styled.button`
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
        width: calc(100dvw - 40px);
    }

    &:disabled {
        background-color: ${({ theme }) => theme.color.gray300};
        cursor: default;
    }
`;

const CartList = styled.div`
    margin-top: 7px;
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 88px;
`;

const NoItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 0 20px;
    gap: 43px;

    height: calc(100dvh - 140px);

    .title-text {
        font-size: 20px;
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    }

    .sub-text {
        font-size: 18px;
        font-weight: ${({ theme }) => theme.fontWeight.medium};
        text-align: center;
        color: ${({ theme }) => theme.color.gray600};
    }
`;

export default StoreList;
