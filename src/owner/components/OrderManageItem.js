import styled from "styled-components";

const OrderManageItem = ({
    item,
    onClick = () => {},
    handleItem = () => {},
}) => {
    return (
        <OrderContainer>
            <div className="header">
                <div className="left">
                    <span className="time">
                        {item.status === "cancel"
                            ? "주문취소"
                            : `픽업(${item.pickupTime})`}
                    </span>
                    <div className="status">
                        <span>{item.orderTime}</span>
                        {item.status === "주문접수" && <div>준비 중</div>}
                        {item.status === "준비완료" && (
                            <div onClick={() => onClick(item.id)}>
                                방문 대기
                            </div>
                        )}
                    </div>
                </div>
                {item.status === "주문접수" && (
                    <button
                        className="right"
                        onClick={() => {
                            onClick(item.id);
                        }}
                    >
                        준비 완료
                    </button>
                )}
                {item.status === "주문" && (
                    <button
                        className="right before"
                        onClick={() => onClick(item.id)}
                    >
                        접수
                    </button>
                )}
            </div>
            <div
                className="body"
                onClick={() => {
                    if (item.status === "주문") {
                        handleItem(item);
                    }
                }}
            >
                <span>{item.menu.map((order) => order.name).join(", ")}</span>
                <span>주문번호: {item.orderNumber}</span>
                <span>{item.price}</span>
            </div>
        </OrderContainer>
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

            .time {
                color: ${({ theme }) => theme.color.primary};
                font-size: 16px;
                font-weight: ${({ theme }) => theme.fontWeight.semiBold};
            }

            .status {
                align-items: center;
                display: flex;
                gap: 8px;
                span {
                    color: ${({ theme }) => theme.color.gray900};
                    font-size: 20px;
                    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
                }
                div {
                    font-weight: ${({ theme }) => theme.fontWeight.medium};
                    border: 1px solid ${({ theme }) => theme.color.primary};
                    color: ${({ theme }) => theme.color.primary};
                    border-radius: 54px;
                    padding: 5px 8px;
                    font-size: 12px;
                }
            }
        }
        .right {
            width: 80px;
            height: 40px;
            border-radius: 8px;
            border: none;
            background-color: ${({ theme }) => theme.color.primary};
            border: 1px solid ${({ theme }) => theme.color.primary};
            color: white;

            font-size: 16px;
            font-weight: ${({ theme }) => theme.fontWeight.semiBold};
            cursor: pointer;
        }
        .before {
            color: ${({ theme }) => theme.color.primary};
            background-color: white;
            border: 1px solid ${({ theme }) => theme.color.primary};
        }
        margin-bottom: 20px;
    }
    border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
    padding: 0px 20px;
    padding-bottom: 30px;

    .body {
        cursor: pointer;
    }
`;
