import Button from "components/Common/Button";
import Header from "components/Common/Header";
import Splash from "components/Common/Splash";
import MenuList from "components/OrderList/OrderDetail/MenuList";
import SimpleReceipt from "components/OrderList/OrderDetail/SimpleReceipt";
import useSyluvAxios from "hooks/useSyluvAxios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ReviewPage from "./ReviewPage";

const OrderDetailPage = () => {
    const syluvAxios = useSyluvAxios();
    const { orderId } = useParams();
    const { state } = useParams();
    const [orderDetail, setOrderDetail] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getOrderDetail = async () => {
            try {
                const res = await syluvAxios.get(`/order/${orderId}/detail`);
                setOrderDetail(res.data.payload);
            } catch (error) {
                console.error(error);
            }
        };
        getOrderDetail();
    }, [orderId]);

    const deleteOrder = async () => {
        syluvAxios
            .delete(`/order/${orderId}/delete`)
            .then(() => {
                navigate("/orderlist");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleClick = useCallback(() => {
        setIsClicked((prev) => !prev);
    }, []);

    const handleDate = useCallback((date) => {
        // "2024-08-01T01:54:46" -> "2024.08.01 오후 1:54"
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); // 월을 두 자리로 표현
        const day = dateObj.getDate().toString().padStart(2, "0"); // 일을 두 자리로 표현
        const hour = dateObj.getHours();
        const minute = dateObj.getMinutes().toString().padStart(2, "0"); // 분을 두 자리로 표현
        const ampm = hour >= 12 ? "오후" : "오전";
        const hour12 = (hour % 12 || 12).toString().padStart(2, "0"); // 시간을 12시간제로 표현하고 두 자리로 표현
        return `${year}.${month}.${day} ${ampm} ${hour12}:${minute}`;
    }, []);

    const handlePrice = useCallback((price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }, []);

    const handleReviewYn = useCallback(() => {
        setOrderDetail((prev) => ({
            ...prev,
            reviewYn: true,
        }));
    }, []);

    if (!orderDetail) return <Splash />;

    return !isClicked ? (
        <Container>
            <Header
                title="주문상세"
                rightText="삭제"
                cart={false}
                handleRight={deleteOrder}
                backSrc={-1}
            />
            <SimpleReceipt
                date={handleDate(orderDetail.orderDate)}
                orderNum={orderDetail.orderNum}
                name={orderDetail.storeName}
                state={state}
            />
            <MenuList order={orderDetail} />
            <BillContainer>
                <div>
                    <p className="left">결제금액</p>
                    <p className="right">
                        {handlePrice(orderDetail.totalPrice)}원
                    </p>
                </div>
                <div>
                    <p className="left">결제방법</p>
                    <p className="right">{orderDetail.paymentTool}</p>
                </div>
            </BillContainer>
            <ButtonContainer>
                <Button
                    text={
                        orderDetail.reviewYn
                            ? "이미 리뷰를 작성했습니다"
                            : "리뷰 남기기"
                    }
                    type="2"
                    onClick={() => {
                        if (orderDetail.reviewYn) return;
                        handleClick();
                    }}
                    disabled={orderDetail.reviewYn}
                />
            </ButtonContainer>
        </Container>
    ) : (
        <ReviewPage
            name={orderDetail.storeName}
            date={handleDate(orderDetail.orderDate)}
            menus={orderDetail.menuOrders}
            image={orderDetail.storeImg}
            handleClick={handleClick}
            orderId={orderId}
            handleReviewYn={handleReviewYn}
        />
    );
};

export default OrderDetailPage;

const BillContainer = styled.div`
    border-top: 1px solid ${({ theme }) => theme.color.gray900};
    padding-top: 20px;
    flex-direction: column;
    width: 440px;
    display: flex;
    gap: 16px;

    div {
        display: flex;
        justify-content: space-between;

        .left {
            font-size: 14px;
            color: ${({ theme }) => theme.color.gray800};
            font-weight: ${({ theme }) => theme.fontWeight.regular};
        }
        .right {
            font-size: 18px;
            color: ${({ theme }) => theme.color.black900};
            font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        }
    }

    @media (max-width: 480px) {
        width: calc(100dvw - 40px);
    }

    margin-bottom: 100px;
`;

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
    width: 440px;
    gap: 17px;
    position: fixed;
    bottom: 32px;

    @media (max-width: 480px) {
        width: calc(100dvw - 40px);
    }
`;
