import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const OrderItem = ({ order }) => {
    const navigate = useNavigate();

    const handleDate = (date) => {
        // "2024-08-01T01:54:46" -> "2024.08.01 오후 1:54"
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const hour = dateObj.getHours();
        const minute = dateObj.getMinutes();
        const ampm = hour >= 12 ? "오후" : "오전";
        const hour12 = hour % 12;
        return `${year}.${month}.${day} ${ampm} ${hour12}:${minute}`;
    };

    const handlePrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <Container
            onClick={() => {
                navigate("/order/" + order.orderId);
            }}
        >
            <div className="order">
                <div className="order-header">
                    <span className="title-text">{order.marketName}</span>
                    <span className="main-text">
                        {handleDate(order.createdTime)}
                    </span>
                </div>
                <div className="order-body">
                    <div className="left-section">
                        <span className="title-text">{order.storeName}</span>
                        <span className="main-text">
                            {handlePrice(order.totalPrice)}원
                        </span>
                    </div>
                    <span className="success">{order.paymentStatus}</span>
                </div>
            </div>
        </Container>
    );
};

export default OrderItem;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 20px;
    background-color: white;
    cursor: pointer;

    .order-header {
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        .title-text {
            font-size: 16px;
            color: ${({ theme }) => theme.color.gray900};
            font-weight: ${({ theme }) => theme.fontWeight.bold};
        }
        .main-text {
            font-size: 14px;
            color: ${({ theme }) => theme.color.gray600};
            font-weight: ${({ theme }) => theme.fontWeight.medium};
        }
        padding-bottom: 20px;
        border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
    }

    .order-body {
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        color: ${({ theme }) => theme.color.gray500};
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        font-size: 16px;
        align-items: center;
        margin-top: 16px;
        padding-bottom: 20px;

        .left-section {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .title-text {
            color: ${({ theme }) => theme.color.gray900};
        }
        .main-text {
            font-size: 14px;
        }
        .success {
            color: ${({ theme }) => theme.color.primary};
        }
    }
`;
