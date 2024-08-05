import ButtonModal from "components/Common/ButtonModal";
import Splash from "components/Common/Splash";
import useSyluvAxios from "hooks/useSyluvAxios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const OrderManageItem = ({ item, handleItem = () => {} }) => {
    const [status, setStatus] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const syluvAxios = useSyluvAxios();
    const [modal, setModal] = useState();
    const { storeId } = useParams();

    const formatAmount = (amount) => {
        return amount.toLocaleString();
    };

    useEffect(() => {
        if (item.orderStatus === "PAYMENT") {
            setStatus("접수");
        } else if (item.orderStatus === "PREPARING") {
            setStatus("준비 완료");
        } else if (item.orderStatus === "PREPARED") {
            setStatus("방문 대기");
        }
        setIsLoading(false);
    }, [item.orderStatus]);

    const handleStauts = useCallback(() => {
        if (status === "접수") {
            syluvAxios
                .post(`/customer/${storeId}/${item.orderId}/preparing`)
                .then((res) => {
                    setStatus("준비 완료");
                });
        } else if (status === "준비 완료") {
            syluvAxios
                .post(`/customer/${storeId}/${item.orderId}/prepared`)
                .then((res) => {
                    setStatus("방문 대기");
                });
        }
    }, [status]);

    const formatTime = (time) => {
        try {
            // ISO 8601 문자열을 Date 객체로 변환
            const date = new Date(time);
            // 시간과 분을 HH:mm 형식으로 포맷팅
            const formattedTime = date.toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });
            return formattedTime;
        } catch (error) {
            console.error("Invalid time format:", time);
            return "시간 오류"; // 잘못된 시간 형식이 입력된 경우
        }
    };

    const padZero = (num) => num.toString().padStart(2, "0");

    if (isLoading) {
        return <Splash />;
    }

    return (
        <>
            <OrderContainer>
                <div className="header">
                    <div className="left">
                        <span className="pickup-time">
                            {item.pickUpRoute === "픽업하기"
                                ? `픽업(${padZero(item.visitHour)}:${padZero(
                                      item.visitMin
                                  )})`
                                : `가게 이용(${padZero(
                                      item.visitHour
                                  )}:${padZero(item.visitMin)})`}
                        </span>
                        <span className="order-time">
                            주문시각: {formatTime(item.createdAt)}
                        </span>
                    </div>
                    {status && (
                        <div
                            className={`
                        right ${
                            status === "접수" || status === "방문 대기"
                                ? "accept"
                                : ""
                        } ${status === "방문 대기" ? "complete" : ""}
                    `}
                            onClick={() =>
                                status !== "방문 대기" &&
                                (status === "접수"
                                    ? setModal("accept")
                                    : setModal("complete"))
                            }
                        >
                            {status}
                        </div>
                    )}
                </div>
                <div
                    className="body"
                    onClick={() => {
                        handleItem(item, status);
                    }}
                >
                    <span>
                        {item.menu
                            .map((order) =>
                                order.quantity > 1
                                    ? `${order.menuName}x${order.quantity}`
                                    : order.menuName
                            )
                            .join(", ")}
                    </span>
                    <span>주문번호: {item.orderNum}</span>
                    <span>토스페이 {formatAmount(item.totalPrice)}원</span>
                </div>
            </OrderContainer>
            {modal &&
                (modal === "accept" ? (
                    <ButtonModal
                        title="해당 주문을 접수할까요?"
                        subText={`방문 시간: ${item.visitHour}:${item.visitMin}`}
                        left="더 생각해볼게요"
                        right="네, 접수할게요"
                        onLeftClick={() => setModal(null)}
                        onRightClick={() => {
                            handleStauts();
                            setModal(null);
                        }}
                    />
                ) : (
                    <ButtonModal
                        title="해당 주문이 준비완료 되었나요?"
                        left="취소하기"
                        right="완료하기"
                        onLeftClick={() => setModal(null)}
                        onRightClick={() => {
                            handleStauts();
                            setModal(null);
                        }}
                    />
                ))}
        </>
    );
};

export default OrderManageItem;

const OrderContainer = styled.div`
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
            display: flex;
            flex-direction: column;
            gap: 12px;
            font-weight: ${({ theme }) => theme.fontWeight.semiBold};

            .pickup-time {
                color: ${({ theme }) => theme.color.primary};
                font-size: 16px;
            }
            .order-time {
                color: ${({ theme }) => theme.color.gray900};
                font-size: 20px;
            }
            padding-bottom: 20px;
        }
        .right {
            width: 80px;
            height: 40px;
            border-radius: 8px;
            border: none;
            background-color: ${({ theme }) => theme.color.primary};
            border: 1px solid ${({ theme }) => theme.color.primary};
            display: flex;
            justify-content: center;
            align-items: center;

            font-size: 16px;
            font-weight: ${({ theme }) => theme.fontWeight.semiBold};
            color: white;
            cursor: pointer;
        }
        .accept {
            background-color: white;
            color: ${({ theme }) => theme.color.primary};
        }
        .complete {
            cursor: default;
        }
        margin-bottom: 20px;
    }
    border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
    margin-top: 20px;
    padding: 0px 20px;
    padding-bottom: 30px;

    .body {
        cursor: pointer;
    }
`;
